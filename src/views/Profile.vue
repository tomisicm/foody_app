<template>
  <b-container class="mt-2">
    Profile Page:
    <b-form>
      <b-row>
        <b-col md="8">
          <b-col class="my-3">
            <b-form-group label-cols-sm="3" label="Name" class="mb-0">
              <b-input-group>
                <b-form-input v-model="form.username" placeholder="Username"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col class="my-3">
            <b-form-group label-cols-sm="3" label="Email" class="mb-0">
              <b-input-group>
                <b-form-input
                  v-model="form.email"
                  placeholder="Email"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col class="my-3">
            <b-form-group label-cols-sm="3" label="Profession" class="mb-0">
              <b-input-group>
                <b-form-input
                  v-model="form.username"
                  placeholder="Profession"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-col>

        <b-col md="4" id="preview">
          <b-img v-if="selectedFileUrl" width="200" height="200" :src="selectedFileUrl" />
        </b-col>
      </b-row>

      <b-row md="8" class="mt-3">
        <b-form-group class="mb-0">
          <b-form-file
            @change="onFileSelected"
            accept="image/jpeg, image/png, image/gif"
            placeholder="Choose picture"
          >
          </b-form-file>
        </b-form-group>
        <b-btn @click="handleUpload" class="mx-2" variant="primary">Upload</b-btn>
      </b-row>

    </b-form>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        profession: '',
        email: ''
      },
      selectedFile: null,
      selectedFileUrl: null
    }
  },

  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]

      this.selectedFileUrl = this.selectedFile && URL.createObjectURL(this.selectedFile)
    },

    handleUpload () {
      console.log('uploading')
    }
  }
}
</script>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview > img {
  max-width: 200px;
  max-height: 200px;
}
</style>
