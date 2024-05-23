import { NextResponse } from 'next/server';
import { prisma } from '@/initPrsima';

export async function GET() {
  try {
    const getPosts = await prisma.post.findMany();
    console.log(getPosts.length);

    if (getPosts.length > 0) {
      return NextResponse.json(getPosts, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No Posts Found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
