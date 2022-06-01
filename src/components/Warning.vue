<template>
  <div v-if="visible" class="container-fluid p-0 m-0">
    <div class="row pt-3">
      <div class="col-md-12 text-right">
        <div
          class="py-2 px-3 float-right row"
          style="background-color: red; color: white"
        >
          <div class="col-*-8 pt-2 mr-5">
            <b-icon icon="exclamation-triangle-fill"></b-icon> {{ msg }}
          </div>
          <div class="col ml-5">
            <b-button
              style="background-color: red; border-color: white; color: white"
              @click="$emit('hideWarning')"
              class="px-5"
              >No</b-button
            >
          </div>
          <div class="col">
            <b-button
              variant="outline-light"
              @click="confirmDelete"
              class="px-5"
              style="color: red; background-color: white"
              >Yes</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Note } from "./NoteList.vue";

@Component
export default class Warning extends Vue {
  @Prop() private msg!: string;
  @Prop() notes!: Note[];
  @Prop({ default: false }) visible!: boolean;
  async confirmDelete() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: this.notes.map((x) => x.id) }),
    };
    let result = await fetch(
      "http://localhost:8085/deleteNotes",
      requestOptions
    );
    if (result.ok) {
      this.$emit("hideWarning");
      this.$emit("notesDeleted", false);
    }
  }
}
</script>
