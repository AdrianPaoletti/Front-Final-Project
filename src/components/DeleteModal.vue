<template>
  <div class="container">
    <div class="modal">
      <h2 class="modal__text">Are you sure you want to delete it?</h2>
      <div>
        <button class="modal__button" @click="onDelete(id)">Confirm</button>
        <button class="modal__button" @click="hide">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DeleteModal",
  data() {
    return {};
  },
  method: {
    hide() {
      this.$emit("click");
    },
  },
  props: ["onDelete", "id"],
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 450px;
  margin-top: 200px;
  height: 100%;
  position: fixed;
}
.modal {
  &__text {
    color: white;
    font-size: 28px;
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
    color: black;
    &:nth-child(1) {
      margin-right: 10px;
    }
    &:hover {
      background: #f8f000;
    }
  }
}
</style>
