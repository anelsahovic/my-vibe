import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);

  // Validate the user session
  if (!user || user === null || !user.id) {
    console.error('User session is invalid or missing:', user);
    return NextResponse.redirect(
      'https://anelsahovic-my-vibe.vercel.app/login'
    );
  }

  try {
    // Check if the user exists in the database
    const dbUser = await prisma.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    // If the user exists, redirect to the home page
    if (dbUser) {
      return NextResponse.redirect(
        'https://anelsahovic-my-vibe.vercel.app/home'
      );
    }
    // If the user doesn't exist, create the user in the database
    await prisma.user.create({
      data: {
        kindeId: user.id,
        name: `${user?.given_name ?? ''} ${user?.family_name ?? ''}`.trim(),
        username: user.username ?? user.email?.split('@')[0] ?? '',
        email: user.email ?? '',
        image: user.picture ?? '',
      },
    });

    // Redirect to the home page after creating the user
    return NextResponse.redirect('https://anelsahovic-my-vibe.vercel.app/home');
  } catch (error) {
    console.error('Database operation failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
