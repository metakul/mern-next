import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json(); 
    const { email, password } = body;
    console.log(email);

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

    console.log(user.user_type);
    
    // Check if user_type is "METAKUL_USER" (Assuming user.user_type is in the user object)
    if (user?.user_type !==  "METAKUL_OWNER") {
      return NextResponse.json({ error: "Do not have enough Permission" }, { status: 403 });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        smartWalletAddress: user.smartWalletAddress,
        walletAddress: user.walletAddress,
        user_type: user.user_type,
      },
      process.env.NEXT_SECRET_KEY!,
      { expiresIn: "10h" }
    );

    const refreshToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        smartWalletAddress: user.smartWalletAddress,
        walletAddress: user.walletAddress,
        user_type: user.user_type,
      },
      process.env.NEXT_SECRET_KEY!,
      { expiresIn: "1d" }
    );

    const token = {
      access: accessToken,
      refresh: refreshToken,
    };

    // Send response with tokens
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (err) {
    console.error('Login failed:', err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
