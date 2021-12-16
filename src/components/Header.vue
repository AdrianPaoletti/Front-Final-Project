<template>
  <header class="header">
    <router-link class="navigation__link logo" to="/"
      ><h1 class="logo" @click="isActive = false" @keydown="vue">
        my<span>V</span>ideau<span>!</span>
      </h1></router-link
    >
    <div
      class="menu"
      @click="isActive = !isActive"
      @keydown="bar"
      :class="
        this.user.isAuthenticated && isActive
          ? 'menu--display'
          : !this.user.isAuthenticated
          ? 'menu--display-none'
          : ''
      "
    >
      <span class="menu_line"></span>
      <span class="menu_line"></span>
      <span class="menu_line"></span>
    </div>
    <ul
      class="navigation"
      :class="isActive ? 'navigation--active' : ''"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <router-link class="navigation__link" to="/myvideos">
        <li
          class="navigation__element"
          @click="isActive = !isActive"
          @keydown="vue"
        >
          Myvideos
        </li>
      </router-link>
      <router-link class="navigation__link" to="/profile">
        <li
          class="navigation__element"
          @click="isActive = !isActive"
          @keydown="vue"
        >
          Profile
        </li>
      </router-link>
      <router-link class="navigation__link" to="/login">
        <li
          class="navigation__element"
          @click="
            isActive = !isActive;
            logOut();
          "
          @keydown="vue"
        >
          Log out
        </li>
      </router-link>
    </ul>
  </header>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "HeaderNav",
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["logOut", "getToken"]),
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@include fontITC;

* {
  margin: 0;
  padding: 0;
}
.header {
  padding: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.logo {
  font-family: "ITC Avant Garde";
  margin: 10px 0 0 10px;
  color: white;
  z-index: 4;
  font-size: 34px;
  span {
    color: #f8f000;
  }
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  margin: 10px 30px 0 0;
  &_line {
    display: flex;
    width: 33px;
    height: 4px;
    -webkit-transition: 0.8s cubic-bezier(0.07, 0.95, 0, 1);
    transition: 0.8s cubic-bezier(0.07, 0.95, 0, 1);
    margin-bottom: 5px;
    background: white;
    z-index: 2;
  }
  span:nth-child(2) {
    background: #f8f000;
  }
  &.menu--display {
    color: white;
    display: flex;
    span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
  &.menu--display-none {
    display: none;
  }
}
.navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 100vw;
  right: -100vw;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.17),
      rgba(31, 30, 30, 0.27)
    ),
    linear-gradient(90deg, #ffef7eeb, #fed750, #ffef7eeb);
  transition: 0.8s cubic-bezier(0.2, 0.7, 0.1, 1);
  z-index: 1;
  height: 100vh;
  &.navigation--active {
    right: 0;
    left: 0;
  }
  &__element {
    font-family: "ITC Avant Garde";
    font-size: 30px;
    padding-top: 10px;
    color: white;
    list-style: none;
    text-align: center;
    z-index: 1;
  }
  &__link {
    text-decoration: none;
    margin: 10px;
  }
}
@media (min-width: 1100px) {
  .navigation {
    &__element {
      font-size: 35px;
      padding-top: 20px;
      color: white;
      list-style: none;
      text-align: center;
      z-index: 1;
    }
  }
}
</style>
