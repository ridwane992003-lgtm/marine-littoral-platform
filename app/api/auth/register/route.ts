import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, email, password } = body;

    // Validation
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (email.length < 5 || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Email invalide' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // TODO: Add user to database
    // For now, we'll just return a success response
    // In production, you would:
    // 1. Hash the password with bcrypt
    // 2. Check if user already exists
    // 3. Save user to database (Supabase, MongoDB, etc.)
    // 4. Send confirmation email

    console.log('New user registration:', { fullname, email });

    return NextResponse.json(
      {
        message: 'Inscription réussie',
        user: {
          email,
          fullname,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
