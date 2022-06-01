<template>
  <div v-if="visible">
    <b-card title="Add note" style="max-width: 25rem" class="text-left">
      <b-card-text>
        <b-form-input
          v-model="title"
          :state="titleValid"
          class="my-3"
          type="text"
          placeholder="Add title"
        />
        <b-form-textarea v-model="content" :state="contentValid" class="my-3" />
      </b-card-text>
      <b-button
        href="#"
        @click="saveNote"
        class="mr-3 px-5"
        variant="primary active"
        >Save</b-button
      >
      <b-button href="#" @click="hideNote" class="px-5" variant="link"
        >Cancel</b-button
      >
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AddNote extends Vue {
  @Prop({ default: false }) visible!: boolean;
  title = "";
  content = "";
  hideNote() {
    this.title = this.content = "";
    this.$emit("hideNote");
  }
  async saveNote() {
    if (this.titleValid && this.contentValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, content: this.content }),
      };
      let result = await fetch("http://localhost:8085/addNote", requestOptions);
      if (result.ok) {
        this.hideNote();
        this.$emit("noteSaved");
      }
    }
  }
  get titleValid() {
    return this.title.length > 0;
  }
  get contentValid() {
    return this.content.length > 0;
  }
}
</script>
