import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Spinner from "../../src/components/Spinner.vue";
import state from "../mockedState";

describe("Given a Spinner component", () => {
  describe("When is rendered", () => {
    test("Should render the div html tag with a class lds-ellipsis", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(Spinner, {
        global: {
          plugins: [store],
        },
      });
      expect(wrapper.html()).toContain('<div class="lds-ellipsis">');
    });
  });
});
