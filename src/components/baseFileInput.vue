<template>
  <label class="file-select">
    <div class="select-button">
      <b-btn v-if="value">Selected File: {{value.name}}</b-btn>
      <span variant="success" v-else>Select File</span>
    </div>
    <b-form-file
        @change="handleFileChange"
        accept="image/jpeg, image/png, image/gif"
        placeholder="Choose picture"
    />
  </label>
</template>

<script>
export default {
  props: {
    value: File
  },

  methods: {
    handleFileChange (e) {
      this.$emit('changeSelectedFile', e.target.files[0])
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 9px;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
}

.custom-file.b-form-file {
  display: none;
}
</style>
