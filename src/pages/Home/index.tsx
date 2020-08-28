import React, { useEffect } from 'react';

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

import { oauth2SignInLink } from '../../config/spotify';

const Home: React.FC = () => {
  const { signIn } = useAuth();
  const { location } = useHistory();
  const {
    path,
    clientId,
    responseType,
    redirectUri,
    scopes,
  } = oauth2SignInLink;

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
                <a
                  href={`${path}${clientId}${responseType}${redirectUri}${scopes}`}
                >
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

        <a href={`${path}${clientId}${responseType}${redirectUri}${scopes}`}>
          Entrar agora
        </a>
      </MainContent>

      <Footer>
        <img src={spotifyLogo} alt="Spotify - Pagina inicial" />
      </Footer>
    </Container>
  );
};

export default Home;
