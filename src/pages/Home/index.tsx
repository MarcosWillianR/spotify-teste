import React, { useCallback } from 'react';

import {
  Container,
  Header,
  HeaderContent,
  HeaderNavigation,
  MainContent,
  Footer,
} from './styles';

import spotifyLogo from '../../assets/spotify-logo-white.png';
import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    await signIn();
  }, [signIn]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={spotifyLogo} alt="Spotify - Pagina inicial" />

          <HeaderNavigation>
            <ul>
              <li>
                <a href="#test">Premium</a>
              </li>
              <li>
                <a href="#test">Ajuda</a>
              </li>
              <li>
                <a href="#test">Baixar</a>
              </li>
              <li>
                <a href="#test">Inscrever-se</a>
              </li>
              <li>
                <button onClick={handleSignIn} type="button">
                  Entrar
                </button>
              </li>
            </ul>
          </HeaderNavigation>
        </HeaderContent>
      </Header>

      <MainContent>
        <h1>
          Escutar <br />
          muda tudo
        </h1>
        <p>
          Milhões de músicas e podcasts para explorar. E nem precisa de cartão
          de crédito.
        </p>

        <button type="button">Entrar agora</button>
      </MainContent>

      <Footer>
        <img src={spotifyLogo} alt="Spotify - Pagina inicial" />
      </Footer>
    </Container>
  );
};

export default Home;
