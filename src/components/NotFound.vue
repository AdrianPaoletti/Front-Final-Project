<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <h2 class="title">PAGE NOT FOUND</h2>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    backgroundColor() {
      document
        .querySelector("body")
        .setAttribute(
          "style",
          "background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.95),rgba(31, 30, 30, 0.95)),url('https://p4.wallpaperbetter.com/wallpaper/828/828/900/nujabes-wallpaper-preview.jpg');"
        );
    },
  },
  mounted() {
    this.backgroundColor();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  margin-top: 30vh;
}
.title {
  font-size: 30px;
  color: #f8f000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
