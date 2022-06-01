<template>
  <div class="row">
    <div class="shadow-sm p-3 mb-5 bg-white rounded w-50">
      <div class="row d-flex">
        <div class="col text-left">
          <div class="font-weight-bold text-secondary">Total</div>
          <h2 class="text-black-50">
            {{ noteList.length }}
          </h2>
        </div>
        <div class="col text-left">
          <div class="font-weight-bold text-secondary">Completed</div>
          <h2 class="text-black-50">
            {{ noteList.filter((x) => x.status === "Completed").length }}
          </h2>
        </div>
        <div class="col text-left">
          <div class="font-weight-bold text-secondary">Not completed</div>
          <h2 class="text-black-50">
            {{ noteList.filter((x) => x.status === "Not completed").length }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Note } from "./NoteList.vue";

@Component
export default class Statistics extends Vue {
  @Prop() noteList!: Note[];
}
</script>
