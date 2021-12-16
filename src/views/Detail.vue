<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <div class="video-card">
        <div class="video-card__video">
          <iframe
            :src="parseVideo()"
            frameborder="0"
            title="{{this.video.id}}"
          ></iframe>
        </div>
        <div class="video-card__info">
          <img
            class="video-card__image"
            :src="video.user.avatar"
            width="50"
            height="50"
            alt="profile"
          />
          <div class="video-card__text">
            <h3 class="video-card__title">{{ video.title }}</h3>
            <p class="video-card__date">
              {{ video.user.username }} · {{ getDate() }}
            </p>
          </div>
        </div>
        <section class="video-card__description">
          {{ video.description }}
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetailV",
  computed: {
    ...mapState(["video", "user"]),
  },
  methods: {
    ...mapActions(["loadVideo", "getToken"]),
    parseVideo() {
      if (this.video.url) {
        const urlSection = this.video.url.split("=")[1].split("&")[0];
        this.urlVideo = `https://www.youtube-nocookie.com/embed/${urlSection}?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&autohide=0&controls=0&disablekb=1`;
        return this.urlVideo;
      }
      return this.urlVideo;
    },
    getDate() {
      const options = { day: "numeric", year: "numeric", month: "short" };
      this.dateVideo = new Date(this.video.date).toLocaleString(
        "es-ES",
        options
      );
      return this.dateVideo;
    },
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
  async mounted() {
    this.backgroundColor();
    const route = useRoute();
    const { id } = route.params;
    this.loadVideo(id);
    await this.getToken();
    this.redirectLogin();
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@include youtubeSans;

.container {
  font-family: "Youtube Sans";
  display: grid;
  padding: 0;
  margin: 0 auto;
  margin-top: 30px;
  overflow: hidden;
  max-width: 800px;
}
.video-card {
  color: #c0bcbc;
  &__video {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &__image {
    border-radius: 10px;
    margin: 10px 5px 0 10px;
  }
  &__info {
    display: flex;
    justify-content: left;
    margin-top: 8px;
  }
  &__text {
    display: flex;
    flex-direction: column;
  }
  &__title {
    text-align: left;
    position: relative;
    text-decoration: none;
    margin-top: 8px;
    margin-left: 5px;
    margin-bottom: 2px;
    display: flex;
    font-size: 20px;
  }
  &__date {
    margin-top: 0;
    margin-left: 5px;
    font-size: 14px;
    display: flex;
  }
  &__description {
    text-align: left;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 8px;
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
