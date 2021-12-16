import mutations from "@/store/mutations";
import mockedState from "../mockedState";
import { Video, User } from "@/types/interface";

describe("Given a store mutations object", () => {
  describe("When getVideos is invoke with a state and payload", () => {
    test("Then it should add the videos in the state", () => {
      const state: any = mockedState;
      const payload: Array<Video> = mockedState.videos;

      mutations.getVideos(state, payload);

      expect(state.videos).toEqual([...payload]);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When loginUser is invoke with a state and payload", () => {
    test("Then it should set isAuthenticated to true and user to the User", () => {
      const state: any = mockedState;
      const payload: User = state.user.user;

      mutations.loginUser(state, payload);

      expect(state.user.isAuthenticated).toBe(true);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When getVideo is invoke with a state and payload", () => {
    test("Then it should add the video in the state", () => {
      const state: any = mockedState;
      const payload: Video = state.video;

      mutations.getVideo(state, payload);

      expect(state.video).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When logOut is invoke with a state and payload", () => {
    test("Then it should set user.isAuthenticated to false user.user to {}", () => {
      const state: any = mockedState;
      const payload: User = state.user;

      mutations.logOut(state, payload);

      expect(state.user.isAuthenticated).toBe(false);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When addVideo is invoke with a state and payload", () => {
    test("Then it should set the state with the new video", () => {
      const state: any = mockedState;
      const payload: Video = state.video;

      mutations.addVideo(state, payload);

      expect(state.videos).toContain(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When getCreations is invoke with a state and payload", () => {
    test("Then it should set the state with the video the user created", () => {
      const state: any = mockedState;
      const payload: Array<Video> = state.videosCreated;

      mutations.getCreations(state, payload);

      expect(state.videosCreated).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When updateVideo is invoke with a state and payload", () => {
    test("Then it should set the videos array with the video updated", () => {
      const state: any = mockedState;
      const payload: Video = state.video;

      mutations.updateVideo(state, payload);
      expect(state.videos).toContainEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When getUserProfile is invoke with a state and payload", () => {
    test("Then it should set the currentUser state with the user getted", () => {
      const state: any = mockedState;
      const payload: User = state.user;

      mutations.getUserProfile(state, payload);
      expect(state.user).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When getUserProfile is invoke with a state and payload", () => {
    test("Then it should set the currentUser state with the user getted", () => {
      const state: any = mockedState;
      const payload: User = state.user;

      mutations.getUserProfile(state, payload);
      expect(state.user).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When updateUserProfile is invoke with a state and payload", () => {
    test("Then it should set the currentUser state with the user updated", () => {
      const state: any = mockedState;
      const payload: User = state.user;

      mutations.getUserProfile(state, payload);
      expect(state.user).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When getFavourites is invoke with a state and payload", () => {
    test("Then it should set the videosFavourite state with the videos favourite", () => {
      const state: any = mockedState;
      const payload: Array<Video> = state.videosFavourite;

      mutations.getFavourites(state, payload);
      expect(state.videosFavourite).toEqual(payload);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When startLoading is invoke with a state", () => {
    test("Then it should set state.isLoading to true", () => {
      const state: any = mockedState;

      mutations.startLoading(state);
      expect(state.isLoading).toBe(true);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When startLoading is invoke with a state", () => {
    test("Then it should set state.isLoading to true", () => {
      const state: any = mockedState;

      mutations.stopLoading(state);
      expect(state.isLoading).toBe(false);
    });
  });
});

describe("Given a store mutations object", () => {
  describe("When deleteVideo is invoke with a state and payload", () => {
    test("Then it should set the state without the video deleted", () => {
      const state: any = mockedState;
      const payload: string = state.video.id;

      mutations.deleteVideo(state, payload);

      expect(state.videos).not.toContain(payload);
    });
  });
});
