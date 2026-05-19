import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { PageModel } from '@/lib/db/models/page';
import { slugify } from '@/lib/utils';
import mongoose from 'mongoose';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const originalPage = await PageModel.findOne({ _id: id, user: session.user.id }).lean();

    if (!originalPage) {
      return NextResponse.json({ success: false, error: { message: 'Page not found' } }, { status: 404 });
    }

    const newTitle = `${originalPage.title} (Copy)`;
    const baseSlug = slugify(newTitle);
    let slug = baseSlug;
    let counter = 1;
    while (await PageModel.findOne({ user: session.user.id, slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Prepare duplicate data
    const duplicateData = {
      ...originalPage,
      title: newTitle,
      slug,
      status: 'draft'
    } as any;
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;

    const duplicatePage = await PageModel.create(duplicateData);

    return NextResponse.json({ success: true, data: duplicatePage }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return NextResponse.json({ success: false, error: { message } }, { status: 500 });
  }
}
