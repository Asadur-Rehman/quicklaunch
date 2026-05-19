import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db/connect';
import { PageModel } from '@/lib/db/models/page';
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

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: 'Internal error' } }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: { message: 'Unauthorized' } }, { status: 401 });
    }

    const id = (await params).id;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: { message: 'Invalid page ID' } }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    // Prevent user from changing ownership
    delete body.user;
    delete body._id;

    const page = await PageModel.findOneAndUpdate(
      { _id: id, user: session.user.id },
      { $set: body },
      { new: true }
    ).lean();

    if (!page) {
      return NextResponse.json({ success: false, error: { message: 'Page not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: 'Internal error' } }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const page = await PageModel.findOneAndDelete({ _id: id, user: session.user.id });

    if (!page) {
      return NextResponse.json({ success: false, error: { message: 'Page not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: { message: 'Internal error' } }, { status: 500 });
  }
}
