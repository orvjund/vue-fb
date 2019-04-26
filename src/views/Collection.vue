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
        v-for="song in selectedCollection.songs"
        :key="song.id"
        class="song"
      >
        {{ song.name }}
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
  }),
  watch: {
    async selectedCollection() {
      if (!this.selectedCollection) return;

      if (!this.selectedCollection.songs) {
        const songsQuery = await firestore.buildQuery('songs', 'collectionId', '==', this.selectedCollection.id);
        this.selectedCollection.songs = await firestore.executeQuery(songsQuery);
      }
    },
  },
  async mounted() {
    this.collections = await firestore.listCollection('collections');
    [this.selectedCollection] = this.collections;
  },
};
</script>
