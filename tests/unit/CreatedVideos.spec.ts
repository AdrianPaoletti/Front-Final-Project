import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import CreatedVideos from "../../src/components/CreatedVideos.vue";
import state from "../mockedState";

describe("Given a CreatedVideos component", () => {
  const store = createStore({
    state() {
      return state;
    },
    actions: {
      loadCreations: jest.fn(),
      createVideo: jest.fn(),
      loadVideo: jest.fn(),
      deleteVideo: jest.fn(),
      updateVideo: jest.fn(),
      getToken: jest.fn(),
    },
  });

  describe("When is rendered", () => {
    test("Then it should render the form div tag with a class creations", () => {
      const wrapper = mount(CreatedVideos, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });
      expect(wrapper.html()).toContain('<div class="creations">');
    });
  });

  describe("When submit button is clicked", () => {
    test("Then it should call clearForm and on submit", async () => {
      const wrapper = mount(CreatedVideos, {
        data() {
          return {
            isCreate: true,
            isActive: true,
          };
        },
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });

      const onSubmit = jest.fn();
      const clearForm = jest.fn();
      onSubmit();
      clearForm();
      const form = wrapper.get("form");
      form.trigger("submit");

      expect(onSubmit).toHaveBeenCalled();
      expect(clearForm).toHaveBeenCalled();
    });
  });

  describe("When submit button is clicked and isCreate=false", () => {
    test("Then it should call onUpdate and clearForm", async () => {
      const wrapper = mount(CreatedVideos, {
        data() {
          return {
            isCreate: false,
            isActive: true,
          };
        },
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });

      const onUpdate = jest.fn();
      const clearForm = jest.fn();
      onUpdate();
      clearForm();
      const form = wrapper.get("form");
      form.trigger("submit");

      expect(onUpdate).toHaveBeenCalled();
      expect(clearForm).toHaveBeenCalled();
    });
  });

  describe("When cancel button is clicked", () => {
    test("Then it should call onCancel function", async () => {
      const wrapper = mount(CreatedVideos, {
        data() {
          return {
            isCreate: false,
            isActive: true,
          };
        },
        global: {
          plugins: [store],
        },
        stubs: ["router-link"],
      });

      const onCancel = jest.fn();
      onCancel();
      const buttonCancel = wrapper.find(".form__button--cancel");
      buttonCancel.trigger("click");

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe("When next pagination button is clicked", () => {
    test("Then it should call loadMore function", async () => {
      const wrapper = mount(CreatedVideos, {
        data() {
          return {
            isCreate: false,
            isActive: true,
          };
        },
        global: {
          plugins: [store],
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

  describe("When previous pagination button is clicked", () => {
    test("Then it should call loadPrevious function", async () => {
      const wrapper = mount(CreatedVideos, {
        data() {
          return {
            isCreate: false,
            isActive: true,
          };
        },
        global: {
          plugins: [store],
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
