<template>
  <div>
    <select v-model="selectedCollection">
      <option
        v-for="collection in collections"
        :key="collection.id"
        :value="collection"
      >
        {{ collection.title }}
      </option>
    </select>

    <div v-if="selectedCollection" class="songs-list">
      <div
        v-for="song in songs"
        :key="song.id"
        :class="{'song': true, 'selected-song': currentSongId === song.id}"
        @click="() => currentSongId = song.id"
      >
        {{ song.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from '@/firetools';
import { Howl } from 'howler';

export default {
  name: 'Collection',
  data: () => ({
    selectedCollection: null,
    collections: [],
    songs: [],
    currentSongId: '',
    thePlayer: null,
  }),
  watch: {
    async selectedCollection() {
      if (this.selectedCollection && !this.selectedCollection.songs) {
        this.songs = [];

        const songsQuery = await firestore.buildQuery('songs', 'collectionId', '==', this.selectedCollection.id);
        this.selectedCollection.songs = await firestore.executeQuery(songsQuery);

        this.songs = this.selectedCollection.songs;
      }
    },
    currentSongId() {
      if (this.currentSongId === '') return;

      const { url } = this.songs.find(song => song.id === this.currentSongId);

      if (this.thePlayer) this.thePlayer.unload();

      this.thePlayer = new Howl({
        src: [url],
        html5: true,
      });
      this.thePlayer.on('end', () => {
        this.nextSong();
      });
      this.thePlayer.play();
    },
  },
  async mounted() {
    this.collections = await firestore.listCollection('collections');
    [this.selectedCollection] = this.collections;
  },
  methods: {
    nextSong() {
      const currentSongIndex = this.songs.findIndex(song => song.id === this.currentSongId);

      if (currentSongIndex + 1 >= this.songs.length) return;

      this.currentSongId = this.songs[currentSongIndex + 1].id;
    },
  },
};
</script>

<style scoped>
.song {
  margin: 5px auto;
  border: 1px solid gray;
  cursor: pointer;
  width: 20em;
  border-radius: 0.25em;
}
.song:hover, .selected-song {
  background-color: lightgray;
}
.selected-song {
  cursor: default;
}
</style>
