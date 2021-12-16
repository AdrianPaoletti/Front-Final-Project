<template>
  <div>
    <div class="video-card__video">
      <iframe
        :src="parseVideo()"
        title="{{this.video.id}}"
        frameborder="0"
      ></iframe>
    </div>
    <div class="video-card__container">
      <div class="video-card__info">
        <img
          class="video-card__image"
          :src="video.user.avatar"
          width="40"
          height="40"
          alt="profile"
        />
        <div class="video-card__text">
          <router-link class="video-card__title" :to="/detail/ + video.id">
            <h3 class="video-card__title">{{ video.title }}</h3></router-link
          >
          <p class="video-card__date">
            {{ video.user.username }} · {{ getDate() }}
          </p>
        </div>
      </div>
      <div class="video-card__actions">
        <em
          class="far fa-square fa-lg"
          @click="
            selectVideo = true;
            addToFavourite(this.video.id);
          "
          @keydown="vue"
          v-if="!selectVideo"
        ></em>
        <em
          class="fas fa-square fa-lg"
          @click="
            selectVideo = false;
            removeFromFavourite(this.video.id);
          "
          @keydown="vue"
          v-else
        ></em>
      </div>
    </div>
    <span v-if="favouriteExists" class="video-card__exists"
      >Your already added this video!</span
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "VideoCard",
  data() {
    return {
      urlVideo: "",
      dateVideo: "",
      selectVideo: false,
      favouriteExists: false,
    };
  },
  props: ["video"],
  computed: {
    ...mapState(["videosFavourite"]),
  },
  methods: {
    ...mapActions(["addFavourite", "removeFavourite", "loadFavourites"]),
    addToFavourite(id) {
      const newId = this.videosFavourite.map((video) => video.id);
      if (newId.includes(id)) {
        this.favouriteExists = true;
        this.selectVideo = false;
      } else {
        this.addFavourite(id);
      }
    },
    removeFromFavourite(id) {
      this.removeFavourite(id);
    },
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
  },
  mounted() {
    this.getDate();
    this.loadFavourites();
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@include youtubeSans;
.video-card {
  &__video {
    position: relative;
    padding-bottom: 56.25%; //16:9
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
  }
  &__text {
    display: flex;
    flex-direction: column;
  }
  &__title {
    text-align: left;
    position: relative;
    text-decoration: none;
    margin-top: 4px;
    margin-left: 5px;
    margin-bottom: 2px;
    display: flex;
    font-size: 17px;
    color: #c0bcbc;
  }
  &__date {
    color: #c0bcbc;
    margin-top: 0;
    margin-left: 9px;
    font-size: 14px;
    display: flex;
  }
  &__link {
    margin: 0;
    padding: 0;
  }
  &__container {
    display: flex;
    justify-content: space-between;
  }
  &__actions {
    display: flex;
    margin-top: 17px;
    margin-right: 10px;
    color: #f8f000;
    cursor: pointer;
    & em:nth-child(2) {
      padding-left: 30px;
      padding-right: 8px;
    }
  }
  &__exists {
    color: #d50d0d;
    font-size: 15px;
    font-family: arial;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.unselected {
  display: block;
}
.selected {
  display: none;
}
</style>
