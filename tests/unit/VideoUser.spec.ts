import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import VideoUser from "../../src/components/VideoUser.vue";
import state from "../mockedState";

describe("Given a VideoUser component", () => {
  describe("When is rendered", () => {
    test("Should render the form html tag with a class video-card__actions", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { createVideo: jest.fn() },
      });
      const wrapper = mount(VideoUser, {
        data() {
          return {
            video: state.video,
          };
        },
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<div class="video-card__actions">');
    });
  });
});
