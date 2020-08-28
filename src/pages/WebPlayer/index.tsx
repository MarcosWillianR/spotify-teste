import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ImageContainer,
  HeaderContainer,
  TitleContainer,
} from './styles';

interface TrackItem {
  id: string;
}

interface ArtistItem {
  id: string;
}

interface RecommendationMainImageState {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

interface RecommendationsAlbumImages {
  url: string;
}

interface recommendationsResponseItem {
  id: string;
  album: {
    images: RecommendationsAlbumImages[];
  };
}

const WebPlayer: React.FC = () => {
  const { user, signOut } = useAuth();
  const [recommendationMainImages, setRecommendationMainImages] = useState<
    RecommendationMainImageState
  >({} as RecommendationMainImageState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getRecommendations() {
      setIsLoading(true);

      const [tracks, artists] = await Promise.all([
        api.get('me/top/tracks', {
          params: {
            limit: 3,
          },
        }),
        api.get('me/top/artists', {
          params: {
            limit: 3,
          },
        }),
      ]);

      const tracksID = tracks.data.items.map((t: TrackItem) => t.id);
      const artistsID = artists.data.items.map((a: ArtistItem) => a.id);

      const { data } = await api.get('recommendations', {
        params: {
          seed_artists: artistsID.join(','),
          seed_track: tracksID.join(','),
          min_popularity: 50,
        },
      });

      const recommendationsResponse: recommendationsResponseItem[] =
        data.tracks;

      const formattedForMainImage = recommendationsResponse.filter(
        recommendation => recommendation?.album?.images.length > 0,
      );

      setRecommendationMainImages({
        image1: formattedForMainImage[0].album.images[0].url,
        image2: formattedForMainImage[1].album.images[0].url,
        image3: formattedForMainImage[2].album.images[0].url,
        image4: formattedForMainImage[3].album.images[0].url,
      });

      console.log(recommendationsResponse);
      setIsLoading(false);
    }

    getRecommendations();
  }, [user]);

  useEffect(() => {
    console.log('recommendationMainImages: ', recommendationMainImages);
  }, [recommendationMainImages]);

  return (
    <Container>
      <HeaderContainer>
        <ImageContainer>
          <img src={recommendationMainImages.image1} alt="recommendation 1" />
          <img src={recommendationMainImages.image2} alt="recommendation 2" />
          <img src={recommendationMainImages.image3} alt="recommendation 3" />
          <img src={recommendationMainImages.image4} alt="recommendation 4" />
        </ImageContainer>

        <TitleContainer>
          <h2>playlist</h2>
          <h1>Musicas Recomendadas</h1>
          <strong>{user.name}</strong>
          <button type="button" onClick={() => signOut()}>
            Sair
          </button>
        </TitleContainer>
      </HeaderContainer>
    </Container>
  );
};

export default WebPlayer;
