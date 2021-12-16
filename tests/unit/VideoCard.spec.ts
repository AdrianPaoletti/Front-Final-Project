import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import VideoCard from "../../src/components/VideoCard.vue";
import state from "../mockedState";

describe("Given a VideoCard component", () => {
  describe("When is rendered", () => {
    test("Should render the div html tag with a class video-card__video", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(VideoCard, {
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
      expect(wrapper.html()).toContain('<div class="video-card__video">');
    });
  });
});
