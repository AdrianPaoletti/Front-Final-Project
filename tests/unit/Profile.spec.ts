import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Profile from "../../src/views/Profile.vue";
import state from "../mockedState";
import DeleteModalUser from "../../src/components/DeleteModalUser.vue";

describe("Given a Profile component", () => {
  describe("When is rendered", () => {
    test("Then it should render the button html tag with a class profile__button", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: {
          getUserProfile: jest.fn(),
          getToken: jest.fn(),
          updateUserProfile: jest.fn(),
          deleteUser: jest.fn(),
          logOut: jest.fn(),
        },
      });
      const wrapper = mount(Profile, {
        global: {
          plugins: [store],
        },
        components: {
          DeleteModalUser,
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain(
        '<input type="text" name="username" id="profile__name" readonly="" class="">'
      );
    });
  });
});
