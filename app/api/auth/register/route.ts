import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/connect';
import { UserModel } from '@/lib/db/models/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: { message: 'Name, email and password are required.', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: { message: 'Password must be at least 8 characters.', code: 'VALIDATION_ERROR' } },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { message: 'An account with this email already exists.', code: 'EMAIL_EXISTS' } },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await UserModel.create({
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      preferences: { defaultTone: 'professional' },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[register] error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Internal server error.', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
