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


/**
 * Update post status from approved to pending
 * @param request
 */
export async function PATCH(request: { json: () => any }) {
  try {
    const { id, status } = await request.json();

    console.log("id",id);
    
    if (!id || !status) {
      return NextResponse.json({ message: 'ID and status are required' }, { status: 400 });
    }

    const validStatuses = ['approved', 'pending', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    const updatedPost = await prisma.post.updateMany({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    if (updatedPost.count > 0) {
      return NextResponse.json({ message: `Post status updated to ${status}` }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No approved post found with the given ID' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating post status:', error);
    return NextResponse.json({ message: 'Error updating post status' }, { status: 500 });
  }
}