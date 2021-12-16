import axios from "axios";
import { ActionContext } from "vuex";
import jwtDecode from "jwt-decode";
import { State, User, Video } from "@/types/interface";

const urlHeroku = process.env.VUE_APP_HEROKU;

const actions = {
  async registerUser(
    { dispatch }: ActionContext<State, State>,
    userData: User
  ): Promise<void> {
    await axios.post(`${urlHeroku}users/register`, userData);
  },

  async loginUser(
    { dispatch, commit }: ActionContext<State, State>,
    userData: User
  ): Promise<void> {
    const { data } = await axios.post(`${urlHeroku}users/login`, userData);
    const { token } = data;
    const userInfo = jwtDecode(token);
    localStorage.setItem(process.env.VUE_APP_TOKEN, JSON.stringify({ token }));
    await commit("loginUser", userInfo);
    dispatch("loadVideos");
  },

  logOut({ commit }: ActionContext<State, State>): string | void {
    localStorage.removeItem(process.env.VUE_APP_TOKEN);
    const userInfo = {};
    commit("logOut", userInfo);
  },

  getToken({ commit, dispatch }: ActionContext<State, State>): string | void {
    try {
      const token = JSON.parse(
        localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
      );
      commit("loginUser", jwtDecode(token.token));
      return;
    } catch (error) {
      dispatch("logOut");
    }
  },

  async loadVideos({
    commit,
  }: ActionContext<State, State>): Promise<void | string> {
    commit("startLoading");
    const { token } = await JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data } = await axios.get(`${urlHeroku}videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("stopLoading");
    commit("getVideos", data);
  },

  async loadVideo(
    { commit }: ActionContext<State, State>,
    id: string
  ): Promise<void | string> {
    const { token } = await JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data } = await axios.get(`${urlHeroku}videos/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("getVideo", data);
  },

  async createVideo(
    { commit }: ActionContext<State, State>,
    video: Video
  ): Promise<void | string> {
    const { token } = await JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data: newVideo } = await axios.post(
      `${urlHeroku}videos/myvideos/create`,
      video,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("addVideo", newVideo);
  },

  async loadCreations({
    commit,
  }: ActionContext<State, State>): Promise<void | string> {
    commit("startLoading");
    const { token } = await JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data: videosCreated } = await axios.get(
      `${urlHeroku}videos/myvideos/created`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("stopLoading");
    commit("getCreations", videosCreated);
  },

  async deleteVideo(
    { dispatch, commit }: ActionContext<State, State>,
    id: string
  ): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    await axios.delete(`${urlHeroku}videos/myvideos/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("deleteVideo", id);
    dispatch("loadCreations");
  },

  async updateVideo(
    { commit }: ActionContext<State, State>,
    video: Video
  ): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data: updatedVideo } = await axios.put(
      `${urlHeroku}videos/myvideos/update/${video.id}`,
      video,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    commit("updateVideo", updatedVideo);
  },

  async getUserProfile({ commit }: ActionContext<State, State>): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data: userProfile } = await axios.get(`${urlHeroku}users/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("getUserProfile", userProfile);
  },

  async updateUserProfile(
    { commit }: ActionContext<State, State>,
    user: User
  ): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data } = await axios.put(`${urlHeroku}users/update`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("updateUserProfile", data);
  },

  async deleteUser({
    dispatch,
  }: ActionContext<State, State>): Promise<void | string> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    await axios.delete(`${urlHeroku}users/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch("logOut");
  },
  async addFavourite(
    { commit }: ActionContext<State, State>,
    id: string
  ): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    await axios({
      method: "PATCH",
      url: `${urlHeroku}videos/favourite/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async removeFavourite(
    { dispatch }: ActionContext<State, State>,
    id: string
  ): Promise<void> {
    const { token } = JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    await axios({
      method: "PATCH",
      url: `${urlHeroku}videos/myvideos/favourite/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch("loadFavourites");
  },
  async loadFavourites({
    commit,
  }: ActionContext<State, State>): Promise<void | string> {
    commit("startLoading");
    const { token } = await JSON.parse(
      localStorage.getItem(process.env.VUE_APP_TOKEN) || ""
    );
    const { data: videosFavourite } = await axios.get(
      `${urlHeroku}videos/myvideos/favourite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    commit("stopLoading");
    commit("getFavourites", videosFavourite);
  },
};

export default actions;
