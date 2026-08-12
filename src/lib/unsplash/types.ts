export interface UnsplashPhoto {
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string | null;
  links: {
    html: string;
    download_location: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
}

export interface CityPhoto {
  url: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  unsplashUrl: string;
}
