<template>
  <transition name="fade" mode="out-in" appear>
    <div>
      <Spinner v-if="isLoading" />
      <div :class="modal ? 'container-modal' : ''">
        <div class="modal" :class="modal ? 'modal--display' : ''">
          <DeleteModal :onDelete="onDelete" :id="idDelete" @click="hide" />
        </div>
      </div>
      <div class="box">
        <div class="box__button" @click="isActive = !isActive" @keydown="vue">
          Add New
        </div>
      </div>
      <div class="creations">
        <div class="video">
          <div
            class="video-card"
            v-for="video in videosCreated.slice(this.minNumber, this.maxNumber)"
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
                  class="fas fa-edit fa-lg"
                  @click="fillForm(video.id)"
                  @keydown="vue"
                ></em>
                <em
                  class="far fa-trash-alt fa-lg"
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
      </div>
      <div
        class="container-form"
        :class="isActive ? 'container-form--active' : ''"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      >
        <form
          class="form"
          form="videoform"
          @submit.prevent="isCreate ? onSubmit() : onUpdate()"
          :class="isActive ? 'form--active' : ''"
        >
          <label for="url" class="form__url">
            <p>Url</p>
            <input
              type="text"
              name="url"
              placeholder="url"
              v-model="videoData.url"
            />
          </label>
          <label for="category" class="form__category">
            <p>Category</p>
            <select
              name="category"
              id="category"
              form="carform"
              v-model="videoData.category"
            >
              <option value="Music">Music</option>
              <option value="Sport">Sport</option>
              <option value="Nature">Nature</option>
              <option value="Funny">Funny</option>
              <option value="Generic">Generic</option>
            </select>
          </label>
          <label for="title" class="form__title">
            <p>Title</p>
            <input
              type="text"
              name="title"
              placeholder="title"
              v-model="videoData.title"
            />
          </label>
          <label for="description" class="form__description">
            <p>Descritpion</p>
            <textarea
              type="text"
              name="description"
              placeholder="..."
              v-model="videoData.description"
            />
          </label>
          <label for="date" class="form__date">
            <p>Date</p>
            <input
              type="date"
              name="date"
              placeholder="date"
              v-model="videoData.date"
            />
          </label>
          <span v-if="wrongData" class="form__wrong"
            >Incompleted fields, please fill all!</span
          >
          <div class="form__buttons">
            <button
              type="submit"
              class="form__button form__button--submit"
              :disabled="
                videoData.url === '' ||
                videoData.category === '' ||
                videoData.title === '' ||
                videoData.description === '' ||
                videoData.date === ''
              "
            >
              {{ isCreate ? "Create" : "Update" }}
            </button>
            <button
              type="button"
              class="form__button form__button--cancel"
              @click="onCancel"
              @keydown="vue"
            >
              Cancel
            </button>
          </div>
        </form>
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
          :class="this.maxNumber >= videosCreated.length ? 'button--none' : ''"
          @click="loadMore"
          @keydown="vue"
        ></em>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";
import DeleteModal from "./DeleteModal.vue";
import Spinner from "../components/Spinner.vue";

export default defineComponent({
  name: "CreatedV",
  data() {
    return {
      urlVideo: "",
      dateVideo: "",
      isActive: false,
      isCreate: true,
      videoData: {
        url: "",
        category: "",
        title: "",
        description: "",
        date: "",
      },
      wrongData: false,
      modal: false,
      idDelete: "",
      maxNumber: 6,
      minNumber: 0,
      function() {
        return { open: false };
      },
    };
  },
  components: { DeleteModal, Spinner },
  computed: {
    ...mapState(["videosCreated", "videos", "video", "user", "isLoading"]),
  },
  methods: {
    ...mapActions([
      "loadCreations",
      "createVideo",
      "loadVideo",
      "deleteVideo",
      "updateVideo",
      "getToken",
    ]),

    parseVideo(url) {
      if (url) {
        const urlParse = url.split("=")[1].split("&")[0];
        return `https://www.youtube-nocookie.com/embed/${urlParse}?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&autohide=0&controls=0&disablekb=1`;
      }
      return this.urlVideo;
    },
    onDelete(id) {
      this.deleteVideo(id);
      this.modal = false;
    },
    async onUpdate() {
      try {
        const videoData = {
          ...this.videoData,
          id: this.video.id,
        };
        await this.updateVideo(videoData);
        this.clearForm();
        this.loadCreations();
        this.isActive = false;
        this.isCreate = true;
      } catch (error) {
        this.wrongData = true;
      }
    },

    async fillForm(id) {
      await this.loadVideo(id);
      this.videoData.url = this.video.url;
      this.videoData.category = this.video.category;
      this.videoData.title = this.video.title;
      this.videoData.description = this.video.description;
      // eslint-disable-next-line prefer-destructuring
      this.videoData.date = this.video.date.split("T")[0];
      this.isActive = true;
      this.isCreate = false;
    },

    async onSubmit() {
      try {
        if (
          this.videoData.url !== "" &&
          this.videoData.category !== "" &&
          this.videoData.title !== ""
        ) {
          await this.createVideo(this.videoData);
          this.loadCreations();
          this.isActive = false;
          this.clearForm();
        }
      } catch (error) {
        this.wrongData = true;
      }
    },

    clearForm() {
      this.videoData.url = "";
      this.videoData.category = "";
      this.videoData.title = "";
      this.videoData.description = "";
      this.videoData.date = "";
    },

    onCancel() {
      this.isActive = !this.isActive;
      this.isCreate = true;
      this.clearForm();
    },

    redirectLogin() {
      if (!this.user.isAuthenticated) {
        this.$router.push("/login");
      }
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
    await this.loadCreations();
    this.redirectLogin();
  },
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: left;
  &__button {
    margin-top: 35px;
    padding: 8px;
    margin-bottom: 0;
    width: fit-content;
    background-color: #f8f000;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 21px;
    &:hover {
      background-color: #f5d102;
    }
  }
}
.creations {
  display: grid;
  &__link {
    text-decoration: none;
    color: black;
  }
}
.container-form {
  margin: 0 auto;
  padding-top: 100px;
  overflow: hidden;
  height: 100vh;
  left: -100vw;
  right: 100vw;
  top: 0;
  bottom: 0;
  position: fixed;
  transition: left 500ms, right 500ms;
  z-index: 3;
  overflow-y: hidden;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.17),
      rgba(31, 30, 30, 0.27)
    ),
    linear-gradient(90deg, #ffef7eeb, #fed750, #ffef7eeb);
  &.container-form--active {
    right: 0;
    left: 0;
  }
}
.form {
  margin-top: 50px;
  max-width: 350px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  &__url {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  &__category {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  &__title {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  &__description {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  &__date {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  input,
  select {
    background-color: rgba(252, 252, 252, 0.9);
    font-size: 15px;
    color: #364377;
    border-radius: 10px;
    padding-left: 20px;
    height: 45px;
    border: none;
  }
  textarea {
    font-family: arial;
    border-radius: 10px;
    height: 65px;
    border: none;
    padding-top: 10px;
    padding-left: 15px;
    font-size: 15px;
    color: #364377;
  }
  ::placeholder {
    color: #364377;
  }
  &__buttons {
    display: flex;
    width: 350px;
  }
  &__button {
    border: none;
    height: 45px;
    width: 80px;
    border-radius: 10px;
    margin-top: 6px;
    margin-bottom: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: white;
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
  &__button--submit {
    background-color: rgb(46, 150, 46);
    &:hover {
      background-color: green;
    }
  }
  &__button--cancel {
    background-color: rgb(199, 50, 50);
    &:hover {
      background-color: red;
    }
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
    padding-right: 5px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  .container-form {
    padding-top: 150px;
  }
}
</style>
