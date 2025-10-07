import type { AuthConfig } from '@auth/core';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';

export const authConfig: AuthConfig = {
  providers: [
    // Autenticación con email/password
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Implementar validación con Supabase
        // Por ahora, validación simple para desarrollo
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // En producción, verificar contra la base de datos
        // const user = await supabase.auth.signInWithPassword({
        //   email: credentials.email as string,
        //   password: credentials.password as string,
        // });

        // Mock user para desarrollo
        return {
          id: '1',
          email: credentials.email as string,
          name: 'Usuario Demo',
        };
      },
    }),

    // Autenticación con Google (opcional)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,
};
