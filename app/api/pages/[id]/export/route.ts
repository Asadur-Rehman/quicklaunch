import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { PageModel } from '@/lib/db/models/page';
import { generateHTML } from '@/lib/export/html-generator';
import mongoose from 'mongoose';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
    }

    const id = (await params).id;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: { message: 'Invalid page ID' } }, { status: 400 });
    }

    await connectDB();
    const page = await PageModel.findOne({ _id: id, user: session.user.id }).lean();

    if (!page) {
      return NextResponse.json({ success: false, error: { message: 'Page not found' } }, { status: 404 });
    }

    // Generate HTML string
    const htmlString = generateHTML(page as any);

    // Return as downloadable file
    return new Response(htmlString, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${page.slug || 'landing-page'}.html"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ success: false, error: { message } }, { status: 500 });
  }
}
