import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import DeleteModal from "../../src/components/DeleteModal.vue";
import state from "../mockedState";

describe("Given a VideoUser component", () => {
  describe("When is rendered", () => {
    test("Should render the form html tag with a class modal__text", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(DeleteModal, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<h2 class="modal__text">');
    });
  });
});
