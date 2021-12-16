import { State } from "@/types/interface";

const state = {
  currentUser: {},
  videos: [],
  videosCreated: [],
  videosFavourite: [],
  user: {
    isAuthenticated: false,
    user: {},
  },
  video: {
    title: "",
    category: "",
    date: "",
    description: "",
    user: {},
    comments: "",
    id: "",
  },
  isLoading: false,
};

export default state as unknown as State;
