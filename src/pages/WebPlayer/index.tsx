import React, { useEffect, useState, useCallback } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';

import api from '../../services/apiClient';
import { useAuth } from '../../hooks/auth';

import formatMiliseconds from '../../helpers/formatMiliseconds';

import {
  ArtistItem,
  RecommendationMainImageState,
  TrackItem,
  TrackListItem,
  recommendationsResponseItem,
} from './types';

import {
  Container,
  ImageContainer,
  HeaderContainer,
  TitleContainer,
  MainTrackList,
  MainTrackListItem,
  ArtistProfile,
  MusicAndArtistNameContainer,
  PlayerContainer,
  Player,
} from './styles';

const WebPlayer: React.FC = () => {
  const { user, signOut } = useAuth();
  const [recommendationMainImages, setRecommendationMainImages] = useState<
    RecommendationMainImageState
  >({} as RecommendationMainImageState);
  const [isLoading, setIsLoading] = useState(false);
  const [trackList, setTrackList] = useState<TrackListItem[]>([]);
  const [currentTrack, setCurrentTrack] = useState<TrackListItem>(
    {} as TrackListItem,
  );

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

      setTrackList(
        recommendationsResponse.map(
          ({ id, album, duration_ms, name, preview_url }) => ({
            id,
            duration_ms,
            formattedDuration: formatMiliseconds(duration_ms),
            release_date: album.release_date,
            album: {
              album_image_url: album.images[0].url,
              album_name: album.name,
              artist_name: album.artists[0].name,
              music_name: name,
              preview_url,
            },
          }),
        ),
      );
      setIsLoading(false);
    }

    getRecommendations();
  }, [user]);

  const handleToggleCurrentTrack = useCallback(
    (trackItem: TrackListItem) => {
      const sameTrack = currentTrack.id === trackItem.id;

      if (sameTrack) {
        setCurrentTrack({} as TrackListItem);
      } else {
        setCurrentTrack(trackItem);
      }
    },
    [currentTrack],
  );

  return (
    <>
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

        <MainTrackList>
          <strong>#</strong>
          <strong>Título</strong>
          <strong>Album</strong>
          <strong>Adicionado em</strong>
          <strong>
            <FiClock size={18} />
          </strong>

          {trackList.length > 0 &&
            trackList.map((track, index) => (
              <MainTrackListItem
                key={track.id}
                isActive={track.id === currentTrack.id}
              >
                <button
                  type="button"
                  onClick={() => handleToggleCurrentTrack(track)}
                >
                  {index + 1}
                  <MdPlayArrow />
                </button>

                <ArtistProfile>
                  <img
                    src={track.album.album_image_url}
                    alt={track.album.album_name}
                  />

                  <MusicAndArtistNameContainer>
                    <p>{track.album.music_name}</p>
                    <strong>{track.album.artist_name}</strong>
                  </MusicAndArtistNameContainer>
                </ArtistProfile>

                <span>{track.album.album_name}</span>

                <span>{track.release_date}</span>

                <span>{track.formattedDuration}</span>
              </MainTrackListItem>
            ))}
        </MainTrackList>
      </Container>
      <PlayerContainer>
        <Player
          controls
          url={currentTrack?.album?.preview_url}
          width="100%"
          height="100%"
        />
      </PlayerContainer>
    </>
  );
};

export default WebPlayer;
