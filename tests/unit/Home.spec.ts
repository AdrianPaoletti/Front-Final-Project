import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";
import state from "../mockedState";
import VideoCard from "../../src/components/VideoCard.vue";

describe("Given a Home component", () => {
  describe("When is rendered", () => {
    test("Should render the ul html tag with a class container-video", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loadVideos: jest.fn(), getToken: jest.fn() },
      });
      const wrapper = mount(Home, {
        global: {
          plugins: [store],
        },
        components: {
          VideoCard,
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<ul class="container-video">');
    });
  });
  describe("When next pagination button is clicked", () => {
    test("Then it should call loadMore function", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loadVideos: jest.fn(), getToken: jest.fn() },
      });
      const wrapper = mount(Home, {
        global: {
          plugins: [store],
        },
        components: {
          VideoCard,
        },
        stubs: ["router-link"],
      });

      const loadMore = jest.fn();
      loadMore();
      const nextButton = wrapper.find(".fa-angle-right");
      nextButton.trigger("click");

      expect(loadMore).toHaveBeenCalled();
    });
  });
  describe("When next pagination button is clicked", () => {
    test("Then it should call loadPrevious function", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loadVideos: jest.fn(), getToken: jest.fn() },
      });
      const wrapper = mount(Home, {
        global: {
          plugins: [store],
        },
        components: {
          VideoCard,
        },
        stubs: ["router-link"],
      });

      const loadPrevious = jest.fn();
      loadPrevious();
      const previousButton = wrapper.find(".fa-angle-left");
      previousButton.trigger("click");

      expect(loadPrevious).toHaveBeenCalled();
    });
  });
});
