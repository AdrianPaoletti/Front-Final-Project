<template>
  <div class="container">
    <Header />
    <transition name="fade" mode="out-in" appear>
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
#app {
  font-family: "ITC Avant Garde";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background-size: cover;
  background-attachment: fixed;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.32),
      rgba(31, 30, 30, 0.43)
    ),
    url("./assets/images/login-pic.jpg");

  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  min-height: -webkit-fill-available;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 13px;
}
::-webkit-scrollbar-track {
  background-color: rgb(26, 24, 24);
}
::-webkit-scrollbar-thumb {
  background: rgb(97, 95, 95);
}
</style>
