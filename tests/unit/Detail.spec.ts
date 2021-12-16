import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Detail from "../../src/views/Detail.vue";
import state from "../mockedState";
import router from "@/router";

describe("Given a Detail component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag with a class video-card__description", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loadVideo: jest.fn(), getToken: jest.fn() },
      });
      const wrapper = mount(Detail, {
        global: {
          plugins: [store, router],
        },
        stubs: ["router-link"],
      });

      expect(wrapper.html()).toContain(
        '<section class="video-card__description">'
      );
    });
  });
});
