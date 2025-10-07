import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';

export default defineConfig({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // TODO: Implementar validación con Supabase
        // Por ahora, validación simple para desarrollo
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock user para desarrollo
        return {
          id: '1',
          email: credentials.email as string,
          name: 'Usuario Demo',
        };
      },
    }),
  ],
});
