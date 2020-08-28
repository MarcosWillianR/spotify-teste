import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import spotifyLogo from '../../assets/spotify-logo-white.png';
import { useAuth } from '../../hooks/auth';

import { oauth2SignInLink } from '../../config/spotify';

import {
  Container,
  HamburguerIcon,
  Header,
  HeaderContent,
  HeaderNavigation,
  MainContent,
  Footer,
} from './styles';

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
  const [menuMobileIsOpen, setMenuMobileIsOpen] = useState(false);

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

  const toggleMenuMobile = useCallback(() => {
    setMenuMobileIsOpen(state => !state);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={spotifyLogo} alt="Spotify - Pagina inicial" />

          <HeaderNavigation menuIsOpen={menuMobileIsOpen}>
            <button type="button" onClick={toggleMenuMobile}>
              <HamburguerIcon menuIsOpen={menuMobileIsOpen} />
            </button>

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
