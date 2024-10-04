import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';
import bcrypt from 'bcrypt';
import { generateTokens } from './tokenutils';

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Check if user_type is "METAKUL_USER" (Assuming user.user_type is in the user object)
    if (user?.user_type !== "METAKUL_OWNER") {
      return NextResponse.json({ error: "Do not have enough Permission" }, { status: 403 });
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(user, true);

    // Send response with tokens
    return NextResponse.json({
      message: "Login successful", data: {
        name: user.firstName,
        token: {
          accessToken,
          refreshToken
        },
        email: user.email,
        category: user.user_type,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('Login failed:', err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
