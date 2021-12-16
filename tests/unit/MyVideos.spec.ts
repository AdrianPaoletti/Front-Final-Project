import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import MyVideos from "../../src/views/MyVideos.vue";
import state from "../mockedState";
import CreatedVideos from "../../src/components/CreatedVideos.vue";

describe("Given a MyVideos component", () => {
  describe("When is rendered", () => {
    test("Should render the div html tag with a class myvideos", () => {
      const store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(MyVideos, {
        global: {
          plugins: [store],
        },
        components: {
          CreatedVideos,
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<div class="myvideos">');
    });
  });
});
