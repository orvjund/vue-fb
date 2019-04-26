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
        class="song"
      >
        {{ song.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from '@/firetools';

export default {
  name: 'Collection',
  data: () => ({
    selectedCollection: null,
    collections: [],
    songs: [],
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
  },
  async mounted() {
    this.collections = await firestore.listCollection('collections');
    [this.selectedCollection] = this.collections;
  },
};
</script>
