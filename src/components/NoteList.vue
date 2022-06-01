<template>
  <div>
    <Statistics :noteList="notes" />
    <div class="row">
      <b-table
        class="table table-hover text-left"
        :items="modedNotes"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-right
        fixed
        head-variant="light"
      >
        <template #head(id)="head">
          <b-form-checkbox @change="toggleDeleteAll($event)">{{
            head.label
          }}</b-form-checkbox>
        </template>
        <template #cell(id)="row">
          <b-form-checkbox
            :checked="row.item.selected === true"
            @change="toggleDelete($event, row.item)"
            >{{ row.item.id }}
          </b-form-checkbox>
        </template>
      </b-table>
    </div>
    <div class="row">
      <div class="text-right col-md-12 p-0">
        <b-button
          href="#"
          @click="addNote"
          class="px-5"
          variant="primary active"
          >Add</b-button
        >
      </div>
    </div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast. It is short and to the point.
    </b-toast>
  </div>
</template>

<script lang="ts">
import Statistics from "./Statistics.vue";
import { Component, Prop, Vue } from "vue-property-decorator";

export interface Note {
  id: number;
  title: string;
  content: string;
  status: string;
  selected?: boolean;
}

@Component({
  components: {
    Statistics,
  },
})
export default class NoteList extends Vue {
  sortBy = "id";
  sortDesc = false;
  fields = [
    { key: "id", sortable: true },
    { key: "title", sortable: true },
    { key: "content", sortable: true },
    { key: "status", sortable: true },
  ];
  @Prop() notes!: Note[];
  modNotes: Note[] = [];
  selected: Note[] = [];
  toggleDelete(checked: boolean, item: Note) {
    item.selected = checked;
    if (item.selected) {
      this.selected.push(item);
    } else {
      this.selected = this.selected.filter((x) => x.id !== item.id);
    }
    this.$emit("deleteNote", this.selected);
  }
  toggleDeleteAll(checked: boolean) {
    this.modedNotes = this.modedNotes.map((x) => {
      return { ...x, selected: checked };
    });
    this.modedNotes.forEach((x) => {
      this.toggleDelete(checked, x);
    });
    this.$emit("deleteNote", this.selected);
  }
  addNote() {
    this.$emit("addNote", true);
  }
  get modedNotes() {
    if (
      this.modNotes.length === 0 ||
      this.notes.length !== this.modNotes.length
    )
      this.modNotes = this.notes;
    return this.modNotes;
  }
  set modedNotes(notes: Note[]) {
    this.modNotes = notes;
  }
}
</script>
