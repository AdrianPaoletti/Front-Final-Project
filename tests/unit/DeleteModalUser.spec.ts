import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import DeleteModalUser from "../../src/views/DeleteModalUser.vue";
import state from "../mockedState";
import VideoCard from "../../src/components/VideoCard.vue";

describe("Given a Modal component", () => {
  describe("When is rendered", () => {
    test("Then it should render the h2 html tag with a class modal__button", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(DeleteModalUser, {
        global: {
          plugins: [store],
        },
        components: {
          VideoCard,
        },
      });
      expect(wrapper.html()).toContain('<h2 class="modal__text">');
    });
  });
});
