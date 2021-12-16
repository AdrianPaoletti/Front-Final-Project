<template>
  <div class="container">
    <transition name="fade" mode="out-in" appear>
      <form class="login" action @submit.prevent="onSubmit">
        <h2>Hello Again!</h2>
        <label class="login__username" for="username">
          <p>Username</p>
          <input
            v-model="username"
            type="text"
            name="username"
            placeholder="Username"
          />
        </label>
        <label class="login__password" for="password">
          <p>Password</p>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <span v-if="wrongData" class="login__wrong"
          >Wrong username and password! Try again!</span
        >
        <button
          type="submit"
          class="login__button"
          :disabled="username === '' || password === ''"
        >
          SIGN IN
        </button>
        <span class="signup"
          >Not a member yet?
          <router-link class="register" to="/register"
            >Sign Up</router-link
          ></span
        >
      </form>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "LoginV",
  data() {
    return {
      username: "",
      password: "",
      wrongData: false,
      isDisable: true,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onSubmit() {
      if (this.username !== "" && this.password !== "") {
        const userData = {
          username: this.username,
          password: this.password,
        };
        try {
          await this.loginUser(userData);
          this.$router.push("/");
        } catch (error) {
          this.wrongData = true;
        }
      }
    },
    backgroundColor() {
      document
        .querySelector("body")
        .setAttribute("style", "background-size:cover");
    },
  },
  mounted() {
    this.backgroundColor();
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
  margin-top: 50px;
  height: 100%;
}
.login {
  max-width: 350px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  h2 {
    color: #f8f000;
    font-size: 25px;
    font-weight: 0px;
    margin-bottom: 50px;
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
    background-color: #e6c346;
    border: none;
    height: 55px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: white;
    &:hover {
      background-color: #fed750;
    }
  }
  &__wrong {
    color: #d50d0d;
    font-size: 15px;
    font-family: arial;
    font-weight: bold;
    margin-bottom: 10px;
  }
  input {
    background-color: rgba(252, 252, 252, 0.9);
    font-size: 15px;
    color: #364377;
    border: none;
    border-radius: 10px;
    padding-left: 20px;
    height: 55px;
    border: none;
  }
  ::placeholder {
    color: #364377;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
