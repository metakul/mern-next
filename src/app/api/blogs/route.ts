import { NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';
import { PostValidation } from '@/validations/PostValidation';
import { BlogsStatusInfo } from '@/Datatypes/enums';
import { Ipost } from '@/Datatypes/interfaces/interface';

export async function GET(request: { url: string | URL; }) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const pageSize = parseInt(searchParams.get('pagesize') as string, 10) || 10;
    const page = parseInt(searchParams.get('page') as string, 10) || 1;

    const posts = await prisma.post.findMany({
      where: {
        status: status || 'approved',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    if (posts.length > 0) {
      return NextResponse.json(posts, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No Posts Found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * add new post
 * @param postModelValidation
 */
const addPost = async (postModelValidation:Ipost) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: postModelValidation.title,
        description: postModelValidation.description || '',
        image: postModelValidation.image,
        author: postModelValidation.author,
        categories: postModelValidation.categories,
        cryptoSymbol: postModelValidation.cryptoSymbol,
        status: BlogsStatusInfo.PENDING,
      },
    });

    return post;
  } catch (error) {
    console.error('Error saving post:', error);
    throw new Error('Error Adding Post');
  }
};

/**
 * Create a new post
 * @param req
 */
export async function POST(request: { json: () => any; }) {
  try {
    const postModelValidation = await PostValidation.validateAsync(
      await request.json()
    );

    if (!postModelValidation) {
      return NextResponse.json(
        { message: 'Invalid details provided.' },
        { status: 400 }
      );
    } else {
      const newPost = await addPost(postModelValidation);
      return NextResponse.json({ newPost }, { status: 201 });
    }
  } catch (error) {
  
    return NextResponse.json({ message: 'Error Adding post' }, { status: 500 });
  }
}