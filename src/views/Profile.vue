<template>
  <b-container class="my-4">
    Profile Page:
    <b-form>
      <b-row>
        <!-- <b-col md="8">
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
 -->
        <b-col v-if="selectedFileUrl" md="4">
          <b-container>
            <b-col>
              <b-img width="200" height="200" :src="cropImg" />
            </b-col>

            <b-col class="w-100">
              <b-btn
                v-if="cropImg"
                @click="handleUpload"
                class="my-2"
                variant="primary">Upload</b-btn>
            </b-col>
          </b-container>
        </b-col>

      </b-row>
    </b-form>

  <b-container>
    <b-col md="6" class="mt-3">
      <b-form-file
        @change="onFileSelected"
        accept="image/jpeg, image/png, image/gif"
        placeholder="Choose picture"
      >
      </b-form-file>

    </b-col>
    <b-col>
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
    <div>
    <b-btn
      @click="cropImage"
      v-if="selectedFileUrl"
      class="mx-2"
      variant="primary"
        >Crop</b-btn>
    </div>
    </b-col>
    </b-container>
  </b-container>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

import userService from '@/utils/services/user-service'

export default {
  data () {
    return {
      form: {
        username: '',
        profession: '',
        email: ''
      },
      selectedFileName: '',
      cropImg: null,
      selectedFileUrl: null
    }
  },

  methods: {
    onFileSelected (event) {
      const selectedFile = event.target.files[0]
      this.selectedFileName = selectedFile.name
      this.selectedFileUrl = URL.createObjectURL(selectedFile)
      this.$refs.cropper.replace(this.selectedFileUrl)
    },

    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },

    handleUpload () {
      userService.uploadUserAvatar(this.cropImg).then((data) => {console.log(data)})
    }
  },

  components: {
    VueCropper
  }
}
</script>
