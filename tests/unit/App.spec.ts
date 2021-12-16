import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";
import state from "../mockedState";
import router from "../../src/router";

describe("Given a App vue file", () => {
  describe("When is rendered", () => {
    test("Then it should render the div html tag with a class container", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(App, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.html()).toContain('<div class="container">');
    });
  });
});
