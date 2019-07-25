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
                  v-model="form.profession"
                  placeholder="Profession"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col class="my-3">
            <b-btn @click="handleUpdate" variant="primary">Update</b-btn>
          </b-col>
        </b-col>
        <b-col md="4">
          <b-container>
            <b-col>
              <b-img v-if="!cropImg" width="200" height="200" :src="img" />
              <b-img v-else width="200" height="200" :src="cropImg" />
            </b-col>
            <b-row md="6" class="mt-3">
              <baseFileInput class="mx-5" @changeSelectedFile="onFileSelected($event)"/>
              <b-btn
                :style="{ marginBottom: '0.5rem' }"
                v-if="cropImg"
                @click="handleUpload"
                variant="primary">Upload
              </b-btn>
            </b-row>
          </b-container>
        </b-col>

      </b-row>
    </b-form>

  <b-container>
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
    <b-col>
      <div>
        <b-btn
          @click="cropImage"
          v-if="selectedFileUrl"
          class="mx-2"
          variant="primary"
        >Crop</b-btn>
        <!-- will see later what do  -->
        <b-btn
          @click="cropImage"
          v-if="selectedFileUrl"
          class="mx-2"
          variant="primary"
        >Done</b-btn>
      </div>
    </b-col>
    </b-container>
  </b-container>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

import userService from '@/utils/services/user-service'

import baseFileInput from '@/components/base/baseFileInput'

export default {
  data () {
    return {
      form: {
        username: '',
        profession: '',
        email: ''
      },
      img: null,
      cropImg: null,
      selectedFile: null,
      selectedFileUrl: null
    }
  },

  methods: {
    onFileSelected (event) {
      this.selectedFile = event
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile)
      this.$refs.cropper.replace(this.selectedFileUrl)
    },

    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },

    async handleUpload () {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        blob.lastModifiedDate = new Date()
        blob.name = 'file.png'

        const formData = new FormData()
        formData.append('file', blob)
        userService.uploadUserAvatar(formData)
      })
    },

    async getProfileData () {
      const { data } = await userService.getProfileData()
      this.form.username = data.name
      this.form.email = data.email
      this.form.profession = data.profile.profession
      this.img = 'http://localhost:3000' + data.profile.avatar
    },

    async handleUpdate () {
      await userService.updateProfile(this.form)
    }
  },

  created () {
    this.getProfileData()
  },

  components: {
    VueCropper, baseFileInput
  }
}
</script>
