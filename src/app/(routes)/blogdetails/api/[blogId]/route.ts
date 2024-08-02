import { NextResponse } from 'next/server';
import { prisma } from '@/initPrisma';
import { Ipost } from '@/Datatypes/interfaces/interface';

export async function GET(request: Request,
    {params}:{params:{blogId:Ipost["_id"]}}
) {
  try {
    
    const blogId = params.blogId
    

    let getPosts;
    if (blogId) {
      // Fetch posts by blogId
      getPosts = await prisma.post.findMany({
        where: {
          id: blogId, // Assuming blogId is a numeric ID, adjust as per your schema
        },
      });
    } else {
      // Fetch all posts
      getPosts = await prisma.post.findMany();
    }


    if (getPosts.length > 0) {
      return NextResponse.json(getPosts[0], { status: 200 });
    } else {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
