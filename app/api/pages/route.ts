import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { PageModel } from '@/lib/db/models/page';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    await connectDB();
    const pages = await PageModel.find({ user: session.user.id })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch pages';
    return NextResponse.json(
      { success: false, error: { message, code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, prompt, sections, theme } = body;

    if (!title || !sections) {
      return NextResponse.json(
        { success: false, error: { message: 'Title and sections are required', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate unique slug
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await PageModel.findOne({ user: session.user.id, slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const page = await PageModel.create({
      user: session.user.id,
      title,
      slug,
      description: description || prompt?.description || '',
      prompt: prompt || { productName: title, description: description || '', tone: 'professional' },
      sections,
      theme: theme || {},
      status: 'draft',
    });

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create page';
    return NextResponse.json(
      { success: false, error: { message, code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
