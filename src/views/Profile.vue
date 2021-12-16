<template>
  <transition name="fade" mode="out-in" appear>
    <div>
      <div :class="modal ? 'container-modal' : ''">
        <div class="modal" :class="modal ? 'modal--display' : ''">
          <DeleteModalUser :onDelete="onDelete" @click="hide" />
        </div>
      </div>
      <div class="container">
        <form class="profile" @submit.prevent="onSubmit">
          <div class="profile__title"><h2>Your profile</h2></div>
          <div class="profile__container-image">
            <img
              :src="url !== null ? this.url : currentUser.avatar"
              class="profile__image"
              width="120"
              height="120"
              alt="profile"
            />
            <label
              class="profile__avatar"
              :class="updating ? 'profile__avatar--display' : ''"
              for="avatar"
            >
              <input
                class="profile__avatar-input"
                type="file"
                name="avatar"
                @change="onFileSelected"
              />
            </label>
          </div>
          <label class="profile__name" for="name">
            <p>Name</p>
            <input
              v-model="profile.name"
              type="text"
              name="username"
              id="profile__name"
              readonly
              class=""
              :class="updating ? 'active' : ''"
            />
          </label>
          <label class="profile__username" for="username">
            <p>Username</p>
            <input
              v-model="profile.username"
              type="text"
              name="username"
              id="profile__username"
              class=""
              :class="updating ? 'active' : ''"
              readonly
            />
          </label>
          <label class="profile__password" for="password">
            <p>Password</p>
            <input
              v-model="profile.password"
              type="password"
              name="password"
              placeholder="Leave empty for old password or add new"
              id="profile__password"
              class=""
              :class="updating ? 'active' : ''"
              readonly
            />
          </label>
          <span v-if="wrongData" class="profile__wrong"
            >Incomplete form! Try again!</span
          >
          <span v-if="updated" class="profile__updated"
            >Successfully updated!</span
          >
          <div class="profile__buttons-container">
            <button type="submit" class="profile__button">
              {{ updating ? "SUBMIT" : "UPDATE" }}
            </button>
            <button class="profile__button" @click="modal = true">
              DELETE
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import DeleteModalUser from "../components/DeleteModalUser.vue";

export default defineComponent({
  name: "ProfileV",
  computed: {
    ...mapState(["user", "currentUser"]),
  },
  data() {
    return {
      profile: {
        name: "",
        username: "",
        password: "",
        avatar: "",
      },
      updating: false,
      updated: false,
      wrongData: false,
      modal: false,
      url: null,
    };
  },
  components: {
    DeleteModalUser,
  },
  methods: {
    ...mapActions([
      "getToken",
      "getUserProfile",
      "updateUserProfile",
      "deleteUser",
      "logOut",
    ]),
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
    async fillUser() {
      await this.getUserProfile();
      this.profile.name = this.currentUser.name;
      this.profile.username = this.currentUser.username;
    },
    makeEditable() {
      document.querySelector("#profile__name").readOnly = false;
      document.querySelector("#profile__username").readOnly = false;
      document.querySelector("#profile__password").readOnly = false;
      this.updating = true;
    },
    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.profile.avatar = event.target.files[0];
      this.url = URL.createObjectURL(this.profile.avatar);
    },
    async onSubmit() {
      if (this.updating) {
        const userData = new FormData();
        if (this.profile.username !== "" && this.profile.name !== "") {
          userData.append("name", this.profile.name);
          userData.append("username", this.profile.username);
          if (this.profile.password === "") {
            userData.append("password", this.currentUser.password);
          } else {
            userData.append("password", this.profile.password);
          }
          if (this.profile.avatar !== "") {
            userData.append("avatar", this.profile.avatar);
          } else {
            userData.append("avatar", this.currentUser.avatar);
          }
        }
        try {
          await this.updateUserProfile(userData);
          this.getUserProfile();
          this.updating = false;
          this.updated = true;
          document.querySelector("#profile__name").readOnly = true;
          document.querySelector("#profile__username").readOnly = true;
          document.querySelector("#profile__password").readOnly = true;
        } catch (error) {
          this.wrongData = true;
        }
      } else {
        this.makeEditable();
      }
    },
    onDelete() {
      this.deleteUser();
      this.$router.push("/login");
    },
    hide() {
      this.modal = false;
    },
  },
  async mounted() {
    await this.getToken();
    this.fillUser();
    this.backgroundColor();
    this.redirectLogin();
  },
});
</script>

<style lang="scss" scoped>
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  margin: 0 auto;
  overflow: hidden;
  max-width: 350px;
  margin-top: 5px;
  height: 100%;
}
.profile {
  max-width: 350px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  &__title {
    display: flex;
    justify-content: center;
  }
  h2 {
    color: #f8f000;
    font-size: 25px;
    font-weight: 0px;
    margin-bottom: 20px;
  }
  &__name {
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
  &__avatar {
    display: none;
    color: white;
    &-input {
      display: flex;
      flex-direction: column;
      width: 108px;
      border-radius: 5px;
      &::-webkit-file-upload-button {
        visibility: hidden;
      }
      &:hover::before {
        background-color: #fed750;
      }
      &::before {
        padding: 10px;
        background: #e6c346;
        content: "Select Avatar";
        color: white;
        font-size: 14px;
        font-family: "Arial";
        font-weight: bold;
        cursor: pointer;
      }
    }
    &.profile__avatar--display {
      display: flex;
    }
  }
  &__username {
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
  &__password {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #f8f000;
    }
  }
  &__button {
    background-color: rgb(46, 150, 46);
    border: none;
    height: 55px;
    width: 80px;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    color: white;
    &:nth-child(1) {
      margin-right: 10px;
      &:hover {
        background: green;
      }
    }
    &:nth-child(2) {
      background: rgb(114, 14, 14);
      &:hover {
        background: rgb(209, 13, 13);
      }
    }
  }
  &__image {
    border-radius: 10px;
    //align-items: right;
    border: 1px solid #f8f000;
    margin-right: 20px;
  }
  input:not(.profile__avatar-input) {
    background-color: rgba(252, 252, 252, 0.9);
    font-size: 17px;
    color: black;
    border-radius: 10px;
    padding-left: 20px;
    height: 45px;
    border: none;
  }
  ::placeholder {
    color: #364377;
  }
  &__container-image {
    display: flex;
    justify-content: left;
    margin-bottom: 25px;
    margin-top: 15px;
  }
  &__buttons-container {
    display: flex;
  }
  &__wrong {
    color: #d50d0d;
    font-size: 15px;
    font-family: arial;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__updated {
    color: green;
    font-size: 15px;
    font-family: arial;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.register {
  text-decoration: none;
  color: #364377;
  cursor: pointer;
  &:hover {
    color: #5579a6;
  }
}
.modal {
  display: none;
  position: fixed;
  margin: 0 auto;
  z-index: 3;
  padding-top: 250px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (min-width: 1100px) {
  .container {
    padding-top: 30px;
  }
}
</style>
