import React, { useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

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
  const { location } = useHistory();

  const authPath = 'https://accounts.spotify.com/authorize';
  const clientId = '?client_id=c265368bd50d49b2b3c3f9a6e20fc541&';
  const responseType = '&response_type=code';
  const redirectUri = '&redirect_uri=http://localhost:3000/';

  useEffect(() => {
    const spotifyToken = location.search.replace('?code=', '');

    async function signInSpotify() {
      try {
        await signIn(spotifyToken);
      } catch (err) {
        console.log(err);
      }
    }

    if (spotifyToken) {
      signInSpotify();
    }
  }, [location, signIn]);

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
                <a href={`${authPath}${clientId}${responseType}${redirectUri}`}>
                  Entrar
                </a>
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
