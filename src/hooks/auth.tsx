import React, {
  createContext,
  useMemo,
  useCallback,
  useState,
  useContext,
} from 'react';
import qs from 'querystring';

import api from '../services/apiClient';

interface AuthContextData {
  user: { id: string };
  signIn(spotifyToken: string): Promise<void>;
}

interface SpotifySignBody {
  [key: string]: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ id: '123' });

  const signIn = useCallback(async (spotifyToken: string) => {
    try {
      const path = 'https://accounts.spotify.com/api/token';
      const body: SpotifySignBody = {
        grant_type: 'authorization_code',
        code: spotifyToken,
        client_id: 'c265368bd50d49b2b3c3f9a6e20fc541',
        client_secret: '51ffe67d3a064fa5b34fc2c10fe873d0',
        redirect_uri: 'http://localhost:3000/',
      };

      const response = await api.post(path, qs.stringify(body), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(response);
      setData({ id: '1234' });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const authData = useMemo(() => ({ signIn, user: data }), [signIn, data]);

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
