import { supabase } from '@/lib/supabase';

export interface SignUpCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export const authApi = {
  async signUp({ email, password, username }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          "Display name": username,
        },
      },
    });
    
    if (error) throw error;
    return data;
  },

  async signIn({ email, password }: SignInCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) throw error;
    return data;
  },
}; 