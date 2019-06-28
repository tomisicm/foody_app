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
              v-model="catering.name"
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
        :address="this.catering.address"
        @update:address="updateAddress($event)"
      />

      <b-col class="my-3">
        <ListControll
          :items="catering.contactInformation"
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

          <template v-slot:listitem={item}>
            <div class="mt-1">
              <span class="align-middle">{{item}}</span>
            </div>
          </template>
        </ListControll>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" v-model="catering.website" label="Website" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Website"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Cusine" class="mb-0">
            <b-input-group>
              <multiselect
                v-model="catering.cuisine"
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
        <b-form-group label-cols-sm="3" label="Micheline" class="mb-0">
          <b-input-group>
            <div class="col-md-6">
              <b-form-input v-model="catering.michelinStars" placeholder="Number of stars"></b-form-input>
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

      <!-- TODO: fornow only the creator will be allowed to edit page -->
      <!-- <b-col class="my-3" v-b-popover.hover.left="'If checked, you will have edit rights if there is no owner.'">
        <b-form-group label-cols-sm="6" label="I will maintain this page?" class="mb-0">
          <b-input-group>
            <b-form-checkbox class="mt-2"></b-form-checkbox>
          </b-input-group>
        </b-form-group>
      </b-col> -->
    </b-col>

    <b-col md="5">
      <p class="h3 mt-2">Images</p>
        <ListControll
          :items="catering.images"
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

          <template v-slot:listitem={item}>
            <div>{{item}}</div>
          </template>

        </ListControll>

    </b-col>

    <b-col md="5">
      <p class="h2">Menu information</p>
    </b-col>

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
  props: {
    inEdit: Boolean
  },

  data () {
    return {
      catering: {
        name,
        address: {},
        contactInformation: [],
        website: '',
        cuisine: [],
        michelinStars: 0,
        images: []
      },
      newImage: '',
      newContact: ''
    }
  },

  methods: {
    handleAddContact () {
      if (!this.newContact) return
      this.catering.contactInformation.push(this.newContact)
      this.newContact = ''
    },
    handleRemoveContact (contact) {
      const i = this.catering.contactInformation.indexOf(contact)
      this.catering.contactInformation.splice(i, 1)
    },

    handleAddImage () {
      if (!this.newImage) return
      this.catering.images.push(this.newImage)
      this.newImage = ''
    },
    handleRemoveImage (image) {
      const i = this.catering.images.indexOf(image)
      this.catering.images.splice(i, 1)
    },

    updateAddress (address) {
      this.catering.address = address
    },

    handleStars (event) {
      if (event === false) {
        this.catering.michelinStars = 0
      }
    },

    async validateBeforeSubmit () {
      if (this.catering.contactInformation.length === 0) {
        this.errors.add({
          field: 'contact',
          msg: 'Please provide contact information.'
        })
      } else if (this.catering.cuisine.length === 0) {
        this.errors.add({
          field: 'cuisine',
          msg: 'Please provide cuisine category.'
        })
      } else if (this.catering.images.length < 2) {
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
        await cateringService.createCatering(this.catering)
      }
    },

    async getCatering () {
      if (this.inEdit) {
        const { data } = await cateringService.getCatering(this.$route.params.id)
        this.catering = data
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
    this.getCatering()
    // TODO: THERE HAS TO BE ANOTHER WAY
    this.HELP_TEXT_CONSTANTS = constants
  }
}
</script>
