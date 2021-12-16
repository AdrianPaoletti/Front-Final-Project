import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import NotFound from "../../src/components/NotFound.vue";
import state from "../mockedState";

describe("Given a NotFound component", () => {
  describe("When is rendered", () => {
    test("Then it should render the h2 html tag with a class title", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(NotFound, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
        backgroundColor: jest.fn(),
      });
      expect(wrapper.html()).toContain('<h2 class="title">');
    });
  });

  describe("When NotFound is rendered", () => {
    test("Then it should call the mounted function with backgroundcolor function", () => {
      const backgroundColor = jest.fn();
      const { mounted } = NotFound;
      const componentsFake: any = {
        mounted,
        backgroundColor,
      };
      componentsFake.mounted();

      expect(backgroundColor).toBeCalled();
    });
  });
});
