import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";
import state from "../mockedState";

describe("Given a Header component", () => {
  describe("When is rendered", () => {
    test("Should render the form header tag with a class header", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { logOut: jest.fn(), getToken: jest.fn() },
      });
      const wrapper = mount(Header, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<header class="header">');
    });
  });
});
