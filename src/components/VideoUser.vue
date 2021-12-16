<template>
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
        width="35"
        height="35"
        alt="profile"
      />
      <div class="video-card__text">
        <router-link class="video-card__title" :to="/detail/ + video.id">
          <h3 class="video-card__title">{{ video.title }}</h3></router-link
        >
        <p class="video-card__date">{{ getDate() }}</p>
      </div>
    </div>
    <div class="video-card__actions">
      <em class="fas fa-edit"></em>
      <em class="far fa-trash-alt" @click="onDelete()" @keydown="vue"></em>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "VideoUser",
  data() {
    return {
      urlVideo: "",
      dateVideo: "",
    };
  },
  props: ["video"],
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    ...mapActions(["deleteVideo"]),
    parseVideo() {
      if (this.video.url) {
        const urlParse = this.video.url.split("=")[1].split("&")[0];
        this.urlVideo = `https://www.youtube-nocookie.com/embed/${urlParse}?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&autohide=0&controls=0&disablekb=1`;
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
    onDelete() {
      this.deleteVideo(this.video.id);
    },
  },
  mounted() {
    this.getDate();
  },
});
</script>

<style lang="scss" scoped>
.video-card {
  margin-top: 15px;
  display: grid;
  flex-direction: column;
  align-items: left;
  max-width: 350px;
  &__info {
    display: flex;
  }
  &__text {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &__title {
    margin: 0 0 5px 5px;
    display: flex;
    font-size: 17px;
    text-decoration: none;
    color: black;
  }
  &__date {
    margin: 4px 0 5px 5px;
    font-size: 14px;
    display: flex;
  }
  &__actions {
    display: flex;
    cursor: pointer;
  }
  em {
    padding: 0 5px 0 5px;
  }
}
</style>
