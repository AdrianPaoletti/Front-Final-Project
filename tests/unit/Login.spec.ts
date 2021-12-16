import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import router from "../../src/router";
import Login from "../../src/views/Login.vue";
import state from "../mockedState";

describe("Given a Login component", () => {
  describe("When is rendered", () => {
    test("Should render the span html tag with a class signup", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(Login, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<span class="signup">');
    });
  });

  describe("When submit button is clicked", () => {
    test("Then it should call onSubmit action", () => {
      const onSubmit = jest.fn();
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(Login, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });

      onSubmit();
      const form = wrapper.get("form");
      form.trigger("submit");

      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe("When submit button is clicked and input values are correct", () => {
    test("Then it should call loginUser function", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const methods = {
        loginUser: jest.fn(),
        backgroundColor: jest.fn(),
      };
      const wrapper = mount(Login, {
        global: {
          plugins: [store, router],
        },
        stubs: ["router-link"],
        methods,
      });

      wrapper.get("form").trigger("submit");
      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("adri");
      inputPassword.setValue("1234");

      expect(inputName.element.value).toBe("adri");
      expect(inputPassword.element.value).toBe("1234");
    });
  });
});
