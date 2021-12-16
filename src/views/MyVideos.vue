<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <div class="myvideos">
        <div
          class="myvideos__element"
          @click="
            isCreated = true;
            isFavourite = false;
          "
          @keydown="vue"
        >
          Created
        </div>

        <div
          class="myvideos__element"
          @click="
            isFavourite = true;
            isCreated = false;
          "
          @keydown="vue"
        >
          Favourites
        </div>
      </div>
      <section>
        <div class="created" v-show="isCreated"><CreatedVideos /></div>
        <div class="favourite" v-show="isFavourite"><Favourite /></div>
      </section>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import CreatedVideos from "../components/CreatedVideos.vue";
import Favourite from "../components/Favourite.vue";

export default defineComponent({
  name: "MyVideos",
  components: {
    CreatedVideos,
    Favourite,
  },
  data() {
    return {
      isCreated: false,
      isFavourite: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    redirectLogin() {
      if (!this.user.isAuthenticated) {
        this.$router.push("/login");
      }
    },
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
    this.redirectLogin();
    this.backgroundColor();
  },
});
</script>

<style lang="scss" scoped>
.myvideos {
  display: flex;
  color: white;
  justify-content: center;
  &__element {
    display: flex;
    color: #f8f000;
    align-items: center;
    margin-top: 25px;
    font-size: 25px;
    cursor: pointer;
    &:nth-child(1) {
      padding-right: 25px;
    }
    &:nth-child(2) {
      padding-left: 25px;
    }
  }
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
