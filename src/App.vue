<template>
  <div id="app" class="container-fluid bg-light px-5 py-4">
    <NoteList
      @addNote="showAddNote"
      @deleteNote="deleteNote"
      :notes="dataList"
    ></NoteList>
    <AddNote
      @hideNote="showAddNote(false)"
      @noteSaved="updateList"
      :visible="addNoteVisible"
    />
    <Warning
      :msg="
        deleteNotes.length === 1
          ? 'Do you really want to delete this note?'
          : 'Do you really want to delete these notes?'
      "
      :visible="deleteNoteVisible"
      @hideWarning="showDeleteWarning"
      @notesDeleted="deleteComplete"
      :notes="deleteNotes"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoteList, { Note } from "./components/NoteList.vue";
import AddNote from "./components/AddNote.vue";
import Warning from "./components/Warning.vue";

@Component({
  components: {
    NoteList,
    AddNote,
    Warning,
  },
})
export default class App extends Vue {
  addNoteVisible = false;
  deleteNoteVisible = false;
  deleteNotes: Note[] = [];
  dataList: Note[] = [];
  showAddNote(value: boolean) {
    this.addNoteVisible = value;
  }
  showDeleteWarning(value: boolean) {
    this.deleteNoteVisible = value;
  }
  deleteNote(notes: Note[]) {
    this.deleteNoteVisible = true;
    this.deleteNotes = notes;
    if (this.deleteNotes.length === 0) this.showDeleteWarning(false);
  }
  deleteComplete() {
    this.updateList();
    this.showDeleteWarning(false);
  }
  async updateList() {
    let result = await fetch("http://localhost:8085/notes");
    let response = await result.json();
    this.dataList = await response;
  }
  mounted() {
    this.updateList();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
