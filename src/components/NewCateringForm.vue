<template>
  <b-form>
    <!-- brief instructions if the user has not created catering -->
    <b-row>
    <b-col md="7">
      <p class="h3 mt-2">Basic information</p>
      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Name" class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="form.name"
              name="name"
              class="w-100"
              placeholder="Enter name of foody place"
              v-validate="'required'"
            />
            <small class="form-text text-danger">{{ errors.first('name') }}</small>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- address component is repeating -->
      <Address
        @update:address="updateAddress($event)"
      />

      <b-col class="my-3">
        <ListControll
          :items="form.contactInformation"
          :error="!!errors.first('contact')"
          @additem="handleAddContact"
          @removeitem="handleRemoveContact"
        >
        <template v-slot:labelfield>
          <b-form-group
            label-cols-sm="6"
            label="Contact Information"
            class="mb-0 mr-0"
          />
        </template>

          <template v-slot:inputfield>
            <b-form-input
              v-model="newContact"
              @keydown.enter="handleAddContact"
              name="contact"
              v-b-popover.hover.right="HELP_TEXT_CONSTANTS.phoneNumbFormatHelpText"
              v-validate="'phoneOrEmail'"
              class="col-md-9 w-100"
              placeholder="Phone or Email"
            />
          </template>
          <template v-slot:inputerrors>
            <small class="form-text text-danger">{{ errors.first('contact') }}</small>
          </template>
        </ListControll>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" v-model="form.website" label="Website" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Website"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Cusine" class="mb-0">
            <b-input-group>
              <multiselect
                v-model="form.cuisine"
                :options="cuisine"
                :multiple="true"
                track-by="_id"
                label="name"
                v-validate="'required'"
                name="cuisine"
                class="input-border"
                placeholder="Select cuisine"
              >
              <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
            </multiselect>
            <small class="form-text text-danger">{{ errors.first('cuisine') }}</small>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Micheline stars" class="mb-0">
          <b-input-group>
            <div class="col-md-6">
              <b-form-checkbox
                v-model="hasStarsBoolean"
                @input="handleStars($event)"
                class="mt-2"
                name="check-button"
                switch
              />
            </div>
            <div v-if="hasStarsBoolean" class="col-md-5">
              <b-form-input v-model="form.michelinStars" placeholder="Number of stars"></b-form-input>
            </div>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Vue-Multiselect type-a-head #sub-asynchronous-select-->
      <!-- <b-col class="my-3" v-b-popover.hover.left="'Does the owner have account? Leave empty otherwise.'">
        <b-form-group label-cols-sm="3" label="Owner" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Enter owner"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col> -->

      <!-- TODO: website -->

      <b-col class="my-3" v-b-popover.hover.left="'If checked, you will have edit rights if there is no owner.'">
        <b-form-group label-cols-sm="6" label="I will maintain this page?" class="mb-0">
          <b-input-group>
            <b-form-checkbox class="mt-2"></b-form-checkbox>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-col>

    <b-col md="5">
      <p class="h3 mt-2">Images</p>
        <ListControll
          :items="form.images"
          :error="!!errors.first('imageurl')"
          @additem="handleAddImage"
          @removeitem="handleRemoveImage"
        >
          <template v-slot:inputfield="{item}">
            <b-form-input
              v-model="newImage"
              @keydown.enter="handleAddImage"
              v-validate="'url'"
              name="imageurl"
              class="col-md-9"
              placeholder="Enter url"
            />
          </template>
          <template v-slot:inputerrors>
            <small class="form-text text-danger">{{ errors.first('imageurl') }}</small>
          </template>

        </ListControll>

    </b-col>

    <!-- <b-col md="5">
      <p class="h2">Menu information</p>
    </b-col> -->

    </b-row>

    <b-row>
      <b-btn
        :disabled="errors.any()"
        variant="primary"
        @click="handleSubmit"
      >Submit</b-btn>
    </b-row>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'

import cateringService from '@/utils/services/catering-service'

import ListControll from '@/components/ListControll'
import Address from '@/components/parts/Address'

import constants from '@/utils/constants'

export default {
  data () {
    return {
      form: {
        name,
        address: {},
        contactInformation: [],
        website: '',
        cuisine: [],
        michelinStars: null,
        images: []
      },
      hasStarsBoolean: false,
      newImage: '',
      newContact: ''
    }
  },

  methods: {
    handleAddContact () {
      if (!this.newContact) return
      this.form.contactInformation.push(this.newContact)
      this.newContact = ''
    },
    handleRemoveContact (contact) {
      const i = this.form.contactInformation.indexOf(contact)
      this.form.contactInformation.splice(i, 1)
    },

    handleAddImage () {
      if (!this.newImage) return
      this.form.images.push(this.newImage)
      this.newImage = ''
    },
    handleRemoveImage (image) {
      const i = this.form.images.indexOf(image)
      this.form.images.splice(i, 1)
    },

    updateAddress (address) {
      this.form.address = address
    },

    handleStars (event) {
      if (event === false) {
        this.form.michelinStars = null
      }
    },

    async validateBeforeSubmit () {
      if (this.form.contactInformation.length === 0) {
        this.errors.add({
          field: 'contact',
          msg: 'Please provide contact information.'
        })
      } else if (this.form.cuisine.length === 0) {
        this.errors.add({
          field: 'cuisine',
          msg: 'Please provide cuisine category.'
        })
      } else if (this.form.images.length < 2) {
        this.errors.add({
          field: 'imageurl',
          msg: 'Please provide at least two images.'
        })
      } else {
        return this.$validator.validateAll()
      }
    },

    async handleSubmit () {
      if (await this.validateBeforeSubmit()) {
        await cateringService.createCatering(this.form)
      }
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  components: {
    ListControll, Address
  },

  created () {
    // TODO: THERE HAS TO BE ANOTHER WAY
    this.HELP_TEXT_CONSTANTS = constants
  }
}
</script>
