'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-bold text-marine">Créer un compte</h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        <input 
          id="fullname" 
          name="fullname" 
          className="input" 
          type="text" 
          placeholder="Nom complet" 
          value={formData.fullname}
          onChange={handleChange}
          required 
        />
        <input 
          id="email" 
          name="email" 
          className="input" 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          id="password" 
          name="password" 
          className="input" 
          type="password" 
          placeholder="Mot de passe" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button 
          type="submit" 
          className="btn w-full justify-center"
          disabled={loading}
        >
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
}
