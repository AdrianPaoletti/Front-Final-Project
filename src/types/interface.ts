export interface User {
  name?: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface Video {
  url: string;
  title: string;
  description: string;
  user: {
    username: string;
    avatar: string;
  };
  category: string;
  date: Date;
  id: string;
}

export interface State {
  videos: Array<Video>;
  videosCreated: Array<Video>;
  videosFavourite: Array<Video>;
  currentUser: User;
  video: Video;
  user: {
    isAuthenticated: boolean;
    user: User;
  };
  isLoading: boolean;
}
