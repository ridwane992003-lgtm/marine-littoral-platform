import { NextResponse } from 'next/server';
import { pool } from '../../db';

export async function POST(request: Request) {
  try {
    const { name, email, institution, password } = await request.json();

    // Requête SQL pour insérer l'utilisateur
    const result = await pool.query(
      'INSERT INTO users (name, email, institution, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
      [name, email, institution, password]
    );

    return NextResponse.json(
      { message: "Utilisateur créé !", user: result.rows[0] }, 
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === '23505') { // Code PostgreSQL pour email existant
      return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Erreur de base de données." }, { status: 500 });
  }
}