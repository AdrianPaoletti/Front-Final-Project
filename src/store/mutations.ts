import { State, User, Video } from "@/types/interface";

const mutations = {
  loginUser(state: State, payload: User): void {
    state.user.isAuthenticated = true;
    state.user.user = payload;
  },
  getVideos(state: State, payload: Array<Video>): void {
    state.videos = payload;
  },
  getVideo(state: State, payload: Video): void {
    state.video = payload;
  },
  logOut(state: State, payload: User): void {
    state.user.isAuthenticated = false;
    state.user.user = payload;
  },
  addVideo(state: State, payload: Video): void {
    state.videos = [...state.videos, payload];
  },
  getCreations(state: State, payload: Array<Video>): void {
    state.videosCreated = payload;
  },
  deleteVideo(state: State, payload: string): void {
    state.videos = state.videos.filter((video: Video) => video.id !== payload);
  },
  updateVideo(state: State, payload: Video): void {
    state.videos = state.videos.map((video) =>
      video.id === payload.id
        ? {
            ...video,
            ...payload,
          }
        : video
    );
  },
  getUserProfile(state: State, payload: User): void {
    state.currentUser = payload;
  },
  updateUserProfile(state: State, payload: User): void {
    state.currentUser = payload;
  },
  getFavourites(state: State, payload: Array<Video>): void {
    state.videosFavourite = payload;
  },
  startLoading(state: State): void {
    state.isLoading = true;
  },
  stopLoading(state: State): void {
    state.isLoading = false;
  },
};

export default mutations;
