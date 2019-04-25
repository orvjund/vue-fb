<template>
  <div class="upload">
    <input ref="files" accept="audio/*" multiple type="file">
    <select v-model="targetCollectionId">
      <option disabled value="">Please select one</option>
      <option
        v-for="collection in collections"
        :key="collection.id"
        :value="collection.id"
      >
        {{ collection.title }}
      </option>
    </select>
    <button ref="uploadButton" @click="uploadSongs">
      Upload
    </button>
  </div>
</template>

<script>
import { firestore, storage } from '@/firetools';

export default {
  name: 'Upload',
  data: () => ({
    targetCollectionId: '',
    collections: [],
  }),
  async created() {
    this.collections = await firestore.listCollection('collections');
  },
  methods: {
    async uploadSongs() {
      const targetCollection = this.collections.find(({ id }) => id === this.targetCollectionId);
      const files = [...this.$refs.files.files];

      if (!targetCollection || !files.length) return;

      const { title: collectionTitle, id: collectionId } = targetCollection;

      this.$refs.uploadButton.disabled = true;

      const uploadPromises = files.map(async (file) => {
        const docPath = `songs/collections/${collectionTitle}/${file.name}`;
        const downloadURL = await storage.uploadFile(docPath, file);

        const songDoc = {
          title: file.name,
          collectionId,
          url: downloadURL,
        };

        await firestore.createDocument('songs', songDoc);
      });

      await Promise.all(uploadPromises);
      this.$refs.uploadButton.disabled = false;
    },
  },
};
</script>

<style scoped>
.upload {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 10px;
  width: 20em;
  max-width: 90%;
  margin: auto;
}
</style>
