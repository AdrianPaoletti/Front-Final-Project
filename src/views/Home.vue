<template>
  <div>
    <Spinner v-if="isLoading" />
    <div>
      <ul class="container-video">
        <li
          class="video-card"
          v-for="video in videos.slice(this.minNumber, this.maxNumber)"
          :key="video.id"
        >
          <VideoCard :video="video" />
        </li>
      </ul>
      <div class="container-buttons">
        <em
          class="fas fa-angle-left fa-2x button"
          :class="this.minNumber <= 0 ? 'button--none' : ''"
          @click="loadPrevious"
          @keydown="vue"
        ></em>
        <em
          class="fas fa-angle-right fa-2x button"
          :class="this.maxNumber >= videos.length ? 'button--none' : ''"
          @click="loadMore"
          @keydown="vue"
        ></em>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import VideoCard from "../components/VideoCard.vue";
import Spinner from "../components/Spinner.vue";

export default defineComponent({
  name: "HomeV",
  data() {
    return {
      maxNumber: 6,
      minNumber: 0,
    };
  },
  components: {
    VideoCard,
    Spinner,
  },
  computed: {
    ...mapState(["videos", "user", "isLoading"]),
  },
  methods: {
    ...mapActions(["loadVideos", "getToken"]),
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
    loadMore() {
      this.maxNumber += 6;
      this.minNumber += 6;
    },
    loadPrevious() {
      this.maxNumber -= 6;
      this.minNumber -= 6;
    },
  },
  async mounted() {
    await this.getToken();
    this.loadVideos();
    this.backgroundColor();
    this.redirectLogin();
  },
});
</script>

<style lang="scss" scoped>
.container-video {
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto;
  grid-row-gap: 5px;
  grid-column-gap: 20px;
  padding: 0;
  overflow: hidden;
}
.video-card {
  font-family: "Youtube Sans";
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: left;
  list-style: none;
}
.container-buttons {
  display: flex;
  justify-content: center;
}
.button {
  color: #f8f000;
  padding: 10px;
  cursor: pointer;
  &.button--none {
    display: none;
  }
}
em:nth-child(1) {
  margin-right: 60px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (min-width: 800px) {
  .container-video {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1100px) {
  .container-video {
    grid-template-columns: repeat(3, 1fr);
    padding-right: 20px;
    padding-left: 5px;
  }
}
</style>
