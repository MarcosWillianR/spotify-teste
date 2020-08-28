export interface TrackItem {
  id: string;
}

export interface ArtistItem {
  id: string;
}

export interface RecommendationMainImageState {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

export interface RecommendationsAlbumImages {
  url: string;
}

export interface RecommendationsArtists {
  id: string;
  name: string;
}

export interface recommendationsResponseItem {
  id: string;
  album: {
    images: RecommendationsAlbumImages[];
    name: string;
    release_date: string;
    artists: RecommendationsArtists[];
  };
  name: string;
  duration_ms: number;
  preview_url: string;
}

export interface TrackListItem {
  id: string;
  album: {
    album_image_url: string;
    album_name: string;
    music_name: string;
    artist_name: string;
    preview_url: string;
  };
  release_date: string;
  duration_ms: number;
  formattedDuration: string;
}
