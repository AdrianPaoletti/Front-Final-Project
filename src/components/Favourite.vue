<template>
  <div>
    <Spinner v-if="isLoading" />
    <div :class="modal ? 'container-modal' : ''">
      <div class="modal" :class="modal ? 'modal--display' : ''">
        <DeleteModal :onDelete="onDelete" :id="idDelete" @click="hide" />
      </div>
    </div>
    <div class="favourites">
      <div class="video">
        <div
          class="video-card"
          v-for="video in videosFavourite.slice(this.minNumber, this.maxNumber)"
          :key="video.id"
        >
          <div class="video-card__video">
            <iframe
              :src="parseVideo(video.url)"
              frameborder="0"
              title="{{this.video.id}}"
            ></iframe>
          </div>
          <div class="video-card__container">
            <div class="video-card__info">
              <img
                class="video-card__image"
                :src="video.user.avatar"
                width="35"
                height="35"
                alt="profile"
              />
              <div class="video-card__text">
                <router-link
                  class="video-card__title"
                  :to="/detail/ + video.id"
                >
                  <h3 class="video-card__title">
                    {{ video.title }}
                  </h3></router-link
                >
                <p class="video-card__date">
                  {{ video.user.username }} ·
                  {{
                    new Date(video.date).toLocaleString("es-ES", {
                      day: "numeric",
                      year: "numeric",
                      month: "short",
                    })
                  }}
                </p>
              </div>
            </div>
            <div class="video-card__actions">
              <em
                class="far fa-trash-alt fa-lg trash"
                @click="
                  modal = true;
                  this.idDelete = video.id;
                "
                @keydown="vue"
              ></em>
            </div>
          </div>
        </div>
      </div>
      <div class="container-buttons">
        <em
          class="fas fa-angle-left fa-2x button"
          :class="this.minNumber <= 0 ? 'button--none' : ''"
          @click="loadPrevious"
          @keydown="vue"
        ></em>
        <em
          class="fas fa-angle-right fa-2x button"
          :class="
            this.maxNumber >= videosFavourite.length ? 'button--none' : ''
          "
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
import DeleteModal from "./DeleteModal.vue";
import Spinner from "./Spinner.vue";

export default defineComponent({
  name: "FavouriteV",
  components: { DeleteModal, Spinner },
  data() {
    return {
      idDelete: "",
      modal: false,
      maxNumber: 6,
      minNumber: 0,
    };
  },
  computed: {
    ...mapState(["videosFavourite", "user", "isLoading"]),
  },
  methods: {
    ...mapActions(["loadFavourites", "removeFavourite", "getToken"]),
    redirectLogin() {
      if (!this.user.isAuthenticated) {
        this.$router.push("/login");
      }
    },
    parseVideo(url) {
      if (url) {
        const urlParse = url.split("=")[1].split("&")[0];
        return `https://www.youtube-nocookie.com/embed/${urlParse}?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&autohide=0&controls=0&disablekb=1`;
      }
      return this.urlVideo;
    },
    onDelete(id) {
      this.removeFavourite(id);
      this.modal = false;
    },
    hide() {
      this.modal = false;
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
    await this.loadFavourites();
    this.redirectLogin();
  },
});
</script>

<style lang="scss" scoped>
.favourites {
  display: grid;
  margin-top: 10px;
  &__link {
    text-decoration: none;
    color: black;
  }
}
.video {
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
  &__video {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
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
  &__actions {
    display: flex;
    margin-top: 17px;
    color: #f8f000;
    cursor: pointer;
    & em:nth-child(2) {
      padding-left: 30px;
      padding-right: 8px;
    }
  }
  &__container {
    display: flex;
    justify-content: space-between;
  }
}
.modal {
  display: none;
  position: fixed;
  margin: 0 auto;
  z-index: 3;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  &.modal--display {
    display: flex;
    justify-content: center;
  }
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
.trash {
  padding-right: 10px;
}
@media (min-width: 800px) {
  .video {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1100px) {
  .video {
    grid-template-columns: repeat(3, 1fr);
    padding-right: 20px;
    padding-left: 5px;
  }
}
</style>
