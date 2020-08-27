import React, {
  createContext,
  useMemo,
  useCallback,
  useState,
  useContext,
} from 'react';

import api from '../services/apiClient';

interface AuthContextData {
  user: { id: string };
  signIn(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ id: '123' });

  const signIn = useCallback(async () => {
    try {
      const authPath = 'https://accounts.spotify.com/authorize';

      const response = await api.get(authPath, {
        params: {
          client_id: '51ffe67d3a064fa5b34fc2c10fe873d0',
          response_type: 'code',
          redirect_uri: 'http://localhost:3000/',
        },
      });

      console.log('response: ', response);
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
