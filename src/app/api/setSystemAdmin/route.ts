import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, walletAddress, smartWalletAddress, encryptedPrivateKey, user_country } = body;

    // Check if a system admin with user_type 'METAKUL_OWNER' already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { user_type: 'METAKUL_OWNER' },
    });

    if (existingAdmin) {
      return NextResponse.json({ error: 'A system admin already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new system admin
    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        walletAddress,
        smartWalletAddress,
        encryptedPrivateKey,
        user_type: 'METAKUL_OWNER',
        user_country,
        emailPending: false,
      },
    });

    // Generate JWT tokens
    const accessToken = jwt.sign(
      {
        sub: newAdmin.id,
        email: newAdmin.email,
        smartWalletAddress: newAdmin.smartWalletAddress,
        walletAddress: newAdmin.walletAddress,
        user_type: newAdmin.user_type,
      },
      process.env.NEXT_SECRET_KEY!,
      { expiresIn: '10h' }
    );

    const refreshToken = jwt.sign(
      {
        sub: newAdmin.id,
        email: newAdmin.email,
        smartWalletAddress: newAdmin.smartWalletAddress,
        walletAddress: newAdmin.walletAddress,
        user_type: newAdmin.user_type,
      },
      process.env.SECRET_KEY!,
      { expiresIn: '1d' }
    );

    const token = {
      access: accessToken,
      refresh: refreshToken,
    };

    // Send response with the created system admin and tokens
    return NextResponse.json(
      { message: 'System Admin created and initialized successfully', token },
      { status: 201 }
    );
  } catch (err) {
    console.error('Initialization failed:', err);
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 });
  }
}
