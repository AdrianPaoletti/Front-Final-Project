import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Register from "../../src/views/Register.vue";
import state from "../mockedState";

describe("Given a Register component", () => {
  describe("When is rendered", () => {
    test("Should render the label html tag with a class register__name", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { registerUser: jest.fn() },
      });
      const wrapper = mount(Register, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain(
        '<label class="register__name" for="name">'
      );
    });
  });
  describe("When form is submited", () => {
    test("Then it should call onSubmit function", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { registerUser: jest.fn() },
      });
      const wrapper = mount(Register, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });

      const onSubmit = jest.fn();
      onSubmit();
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
