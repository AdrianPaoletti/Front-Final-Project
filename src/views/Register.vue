<template>
  <transition name="fade" mode="out-in" appear>
    <div class="container">
      <form class="register" @submit.prevent="onSubmit">
        <h2>Sign Up!</h2>
        <label class="register__name" for="name">
          <p>Name</p>
          <input v-model="name" type="text" name="name" placeholder="Name" />
        </label>
        <label class="register__username" for="username">
          <p>Username</p>
          <input
            v-model="username"
            type="text"
            name="username"
            placeholder="Username"
          />
        </label>
        <label class="register__password" for="password">
          <p>Password</p>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <label class="register__avatar" for="avatar">
          <p>Image</p>
          <input
            class="register__avatar-input"
            type="file"
            name="avatar"
            @change="onFileSelected"
          />
          <div class="register__image">
            <img v-if="url" :src="url" width="80" height="80" class="image" />
          </div>
        </label>

        <span v-if="wrongData" class="register__wrong"
          >Username already in use!</span
        >
        <button
          type="submit"
          class="register__button"
          :disabled="name === '' || username === '' || password === ''"
        >
          SIGN UP
        </button>
      </form>
      <span
        >Already a member?
        <router-link class="login" to="/login">Sign In</router-link></span
      >
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "RegisterV",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      avatar: "",
      wrongData: false,
      url: null,
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    onFileSelected(event) {
      // eslint-disable-next-line prefer-destructuring
      this.avatar = event.target.files[0];
      this.url = URL.createObjectURL(this.avatar);
    },
    async onSubmit() {
      if (this.username !== "" && this.password !== "" && this.name !== "") {
        const userData = new FormData();
        userData.append("name", this.name);
        userData.append("username", this.username);
        userData.append("password", this.password);
        if (this.avatar !== "") {
          userData.append("avatar", this.avatar);
        }
        try {
          await this.registerUser(userData);
          this.$router.push("/login");
        } catch (error) {
          this.wrongData = true;
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@include fontITC;

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
  margin-top: 10px;
  height: 100%;
}
.register {
  max-width: 350px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  h2 {
    color: #f8f000;
    font-size: 25px;
    font-weight: 0px;
    margin-bottom: 22px;
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
  &__avatar {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    p {
      text-align: left;
      margin: 0;
      padding-left: 5px;
      padding-bottom: 5px;
      color: #fed750;
    }
    &-input {
      &::-webkit-file-upload-button {
        visibility: hidden;
      }
      &:hover::before {
        background-color: #fed750;
      }
      &::before {
        background: #e6c346;
        content: "Select Avatar";
        margin-left: 5px;
        color: white;
        font-size: 14px;
        font-family: "Arial";
        font-weight: bold;
        cursor: pointer;
        border-radius: 20px;
        padding: 20px;
      }
    }
  }
  &__button {
    background-color: #e6c346;
    font-weight: bold;
    font-size: 15px;
    color: white;
    border: none;
    height: 55px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      background-color: #fed750;
    }
  }
  &__image {
    margin-left: 265px;
    margin-top: -9px;
    position: absolute;
  }
  &__wrong {
    color: #d50d0d;
    font-size: 15px;
    font-family: arial;
    font-weight: bold;
    margin-bottom: 10px;
  }
  input:not(.register__avatar-input) {
    background-color: rgba(252, 252, 252, 0.9);
    font-size: 15px;
    color: #364377;
    border: none;
    border-radius: 10px;
    padding-left: 20px;
    height: 55px;
    border: none;
  }

  &::placeholder {
    color: #364377;
  }
}
.image {
  border-radius: 10px;
}
.login {
  text-decoration: none;
  color: #364377;
  cursor: pointer;
  &:hover {
    color: #5579a6;
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
