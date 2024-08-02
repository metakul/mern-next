import { NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';

export async function GET() {
  try {
    const approvedPosts = await prisma.post.findMany({
      where: {
        status: 'approved',
      },
    });

    if (approvedPosts.length > 0) {
      return NextResponse.json(approvedPosts, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No Approved Posts Found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
