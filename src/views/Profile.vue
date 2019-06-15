<template>
  <b-container class="my-4">
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
          <b-img v-if="selectedFileUrl" width="200" height="200" :src="cropImg" />
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
        <b-btn @click="cropImage" v-if="selectedFileUrl" style="margin-right: 40px;">Crop</b-btn>
        <b-btn @click="handleUpload" class="mx-2" variant="primary">Upload</b-btn>
      </b-row>
    </b-form>

    <div
      v-show="selectedFileUrl"
      class="my-2"
      style="width: 300px; height:250px; border: 1px solid gray; display: inline-block;"
    >
      <vue-cropper
        ref='cropper'
        :view-mode="3"
        drag-mode="crop"
        :auto-crop-area="0.6"
        :min-container-width="300"
        :min-container-height="250"
        :src="selectedFileUrl"
        alt="Source Image"
        :img-style="{ 'width': '300px', 'height': '250px' }">
      </vue-cropper>
    </div>
  </b-container>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  data () {
    return {
      form: {
        username: '',
        profession: '',
        email: ''
      },
      cropImg: null,
      selectedFileUrl: null
    }
  },

  methods: {
    onFileSelected (event) {
      const selectedFile = event.target.files[0]
      this.selectedFileUrl = URL.createObjectURL(selectedFile)
      this.$refs.cropper.replace(this.selectedFileUrl)
    },

    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },

    handleUpload () {
      console.log('uploading')
    }
  },

  components: {
    VueCropper
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
