<template>
  <div class="video">
    <form class="video__form" form="videoform" @submit.prevent="onSubmit">
      <label for="url">
        YouTube url:
        <input
          type="text"
          v-model="videoData.url"
          name="url"
          placeholder="url"
        />
      </label>
      <label for="category">
        Select category:
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
      <label for="title">
        Title:
        <input
          type="text"
          name="title"
          placeholder="title"
          v-model="videoData.title"
        />
      </label>
      <label for="description">
        Descritpion:
        <textarea
          type="description"
          name="description"
          placeholder="description"
          v-model="videoData.description"
        />
      </label>
      <label for="date">
        Date:
        <input
          type="date"
          name="date"
          placeholder="date"
          v-model="videoData.date"
        />
      </label>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "VideoForm",
  data() {
    return {
      videoData: {
        url: "",
        category: "",
        title: "",
        description: "",
        date: "",
      },
    };
  },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    ...mapActions(["createVideo"]),

    async onSubmit() {
      if (this.url !== "" && this.category !== "" && this.title !== "") {
        await this.createVideo(this.videoData);
        this.$router.push("/");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.video {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
