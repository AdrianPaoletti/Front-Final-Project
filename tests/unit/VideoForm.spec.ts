import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import VideoForm from "../../src/components/VideoForm.vue";
import state from "../mockedState";

describe("Given a VideoForm component", () => {
  describe("When is rendered", () => {
    test("Should render the form html tag with a class video__form", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { createVideo: jest.fn() },
      });
      const wrapper = mount(VideoForm, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain(
        '<form class="video__form" form="videoform">'
      );
    });
  });
});
