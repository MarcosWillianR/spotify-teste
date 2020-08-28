import React, {
  createContext,
  useMemo,
  useCallback,
  useState,
  useContext,
} from 'react';
import qs from 'querystring';
import { signInRequestBody } from '../config/spotify';

import api from '../services/apiClient';

interface AuthContextData {
  user: User;
  signIn(spotifyToken: string): Promise<void>;
  signOut(): void;
}

interface SpotifySignBody {
  [key: string]: string;
}

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Spotify:token');
    const user = localStorage.getItem('@Spotify:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    const localKeys = ['@Spotify:token', '@Spotify:user'];

    localKeys.forEach(keys => {
      localStorage.removeItem(keys);
    });

    api.defaults.headers.authorization = '';

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async (spotifyToken: string) => {
    try {
      const { path } = signInRequestBody;

      delete signInRequestBody.path;

      const body: SpotifySignBody = {
        ...signInRequestBody,
        code: spotifyToken,
      };

      const { data: authResponseData } = await api.post(
        path,
        qs.stringify(body),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token: token } = authResponseData;

      api.defaults.headers.authorization = `Bearer ${token}`;

      const { data: userResponseData } = await api.get('me');
      const { display_name: name, id } = userResponseData;

      localStorage.setItem('@Spotify:token', token);
      localStorage.setItem('@Spotify:user', JSON.stringify({ name, id }));

      setData({
        token,
        user: {
          id,
          name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const authData = useMemo(() => ({ signIn, user: data.user, signOut }), [
    signIn,
    data.user,
    signOut,
  ]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa do AuthProvider em volta do componente');
  }

  return context;
}

export { AuthProvider, useAuth };
