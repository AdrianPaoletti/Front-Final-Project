import axios from "axios";
import { Commit, Dispatch } from "vuex";
import {
  configActionContext,
  configActionContextDispatch,
} from "../test-utils";
import actions from "@/store/actions";
import { Video, User } from "@/types/interface";
import mockedState from "../mockedState";

jest.mock("jwt-decode", () => () => ({}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const commit = jest.fn() as jest.MockedFunction<Commit>;
const dispatch = jest.fn() as jest.MockedFunction<Dispatch>;

describe("Given a loadVideos action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with getVideos and receive the videos", async () => {
      const data: Array<Video> = mockedState.videos;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loadVideos(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getVideos", data);
    });
  });
});

describe("Given a loadVideo action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with getVideo and receive the video", async () => {
      const data: Video = mockedState.video;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loadVideo(
        configActionContext(commit),
        "61a284af1eb9531002792a95"
      );
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getVideo", data);
    });
  });
});

describe("Given a createVideo action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with addVideo and add the new video", async () => {
      const data: Video = mockedState.video;
      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.createVideo(configActionContext(commit), data);

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("addVideo", data);
    });
  });
});

describe("Given a loadCreations action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with getCreations and get the videos created", async () => {
      const data: Array<Video> = mockedState.videos;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loadCreations(configActionContext(commit));

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getCreations", data);
    });
  });
});

describe("Given a deleteVideo action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with the id of the video to delete", async () => {
      const data: Video = mockedState.video;

      mockedAxios.delete.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.deleteVideo(configActionContext(commit), data.id);

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("deleteVideo", data.id);
    });

    test("Then deleteVideo should call dispatch", async () => {
      const data: Video = mockedState.video;
      mockedAxios.delete.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.deleteVideo(configActionContextDispatch(dispatch), data.id);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith("loadCreations");
    });
  });
});

describe("Given a updateVideo action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with updateVideo and the updated video", async () => {
      const data: Video = mockedState.video;
      mockedAxios.put.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.updateVideo(configActionContext(commit), data);

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("updateVideo", data);
    });
  });
});

describe("Given a loginUser action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with the username and the password", async () => {
      const data: User = mockedState.user.user;
      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loginUser(configActionContext(commit), data);

      expect(commit).toHaveBeenCalled();
    });
  });
  describe("When the action is invoked", () => {
    test("Then it should call dispatch with loadVideos", async () => {
      const data: User = mockedState.user.user;
      mockedAxios.post.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loginUser(configActionContextDispatch(dispatch), data);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a logOut action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with logOut and the userInfo", async () => {
      localStorage.removeItem = jest.fn().mockResolvedValue("123456");

      await actions.logOut(configActionContext(commit));

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("logOut", {});
    });
  });
});

describe("Given a getToken action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with loginUser and the userInfo", async () => {
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getToken(configActionContext(commit));

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loginUser", {});
    });
  });
});

describe("Given a getUserProfile action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with getUserProfile and the userProfile", async () => {
      const data: User = mockedState.user.user;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.getUserProfile(configActionContext(commit));

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getUserProfile", data);
    });
  });
});

describe("Given a updateUserProfile action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with updateUserProfile and the userProfile", async () => {
      const data: User = mockedState.user.user;
      mockedAxios.put.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.updateUserProfile(configActionContext(commit), data);

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getUserProfile", data);
    });
  });
});

describe("Given a deleteUser action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call dispatch with logOut", async () => {
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.deleteUser(configActionContextDispatch(dispatch));

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith("logOut");
    });
  });
});

describe("Given a loadFavourites action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call dispatch with getFavourites and the videosFavourite", async () => {
      const data = "2";
      mockedAxios.patch.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.removeFavourite(
        configActionContextDispatch(dispatch),
        data
      );

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given a loadFavourites action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call dispatch with getFavourites and the videos", async () => {
      const data: Array<Video> = mockedState.videos;
      mockedAxios.get.mockResolvedValue({ data });
      JSON.parse = jest.fn().mockResolvedValue("123456");

      await actions.loadFavourites(configActionContext(commit));

      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("getFavourites", data);
    });
  });
});
