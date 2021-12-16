import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Favourite from "../../src/components/Favourite.vue";
import state from "../mockedState";

describe("Given a Favourite component", () => {
  describe("When is rendered", () => {
    test("Then it should render the form div tag with a class favourites", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          loadFavourites: jest.fn(),
          removeFavourite: jest.fn(),
          getToken: jest.fn(),
        },
      });
      const wrapper = mount(Favourite, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<div class="favourites">');
    });
  });
});
