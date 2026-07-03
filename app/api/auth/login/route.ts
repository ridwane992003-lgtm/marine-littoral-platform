import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe sont requis' },
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

    // TODO: Verify credentials against database
    // For now, we'll simulate a successful login
    // In production, you would:
    // 1. Query the database for the user by email
    // 2. Compare the hashed password with bcrypt
    // 3. Create a session or JWT token
    // 4. Set a secure cookie or return the token

    // Simulated successful login
    console.log('User login attempt:', { email });

    return NextResponse.json(
      {
        message: 'Connexion réussie',
        user: {
          email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
