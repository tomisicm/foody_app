<template>
  <div class="text-align:left">
    <form v-on:submit.prevent>
      Find cuisine:
      <div class="form-row">
        <label for="name" class="col-md-12 label">Name:</label>
        <div class="col-md-12">
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          aria-describedby="name"
          placeholder="Enter name"
        >
        </div>
      </div>

      <div class="form-row">
        <label for="city" class="col-md-12 label">City:</label>
        <div class="col-md-12">
          <input
            v-model="city"
            type="text"
            class="form-control"
            id="city"
            aria-describedby="city"
            placeholder="Enter city"
          >
        </div>
      </div>

      <div class="form-row">
        <label for="street" class="col-md-12 label">Address:</label>
        <div class="col-md-8">
          <input v-model="street"
            type="text"
            class="form-control"
            id="street"
            aria-describedby="street"
            placeholder="Street name"
          >
        </div>
        <div class="col-md-4">
          <input
            v-model="streetNo"
            type="text"
            class="form-control"
            id="streetNo"
            aria-describedby="streetNo"
            placeholder="Number"
          >
        </div>
      </div>

      <div class="form-row">
        <label class="col-md-12 label" for="type">Origin:</label>
        <div class="col-md-12">
          <multiselect
            class="input-border"
            v-model="selectedOptions"
            :options="cuisine"
            :multiple="true"
            track-by="name"
            label="name"
            placeholder="Type to search"
          >
          <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
        </multiselect>
        </div>
      </div>

      <div class="form-row">
        <label class="col-md-12 label" id="rating">Selected rating: {{ratingRange[0]}} - {{ratingRange[1]}}</label>
        <div class="col-md-12">
          <vueslider class="w-100" v-model="ratingRange" :min=0 :max=10 :interval=0.1  />
        </div>
      </div>

      <div class="form-row my-4">
        <button class="btn btn-primary mr-3" type="submit" v-on:click="handleSearch">Search</button>
        <button class="btn btn-outline-primary">Clear Filters</button>
      </div>

    </form>
  </div>
</template>

<script>
import cateringService from '@/utils/services/catering-service'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedOptions: [],
      name: '',
      city: '',
      street: '',
      streetNo: null,
      ratingRange: [0, 10]
    }
  },

  methods: {
    async handleSearch () {
      let respData = await cateringService.searchForCatering(this.getFilter())
      this.$emit('newSearch', respData)
    },

    getFilter () {
      return {
        name: this.name,
        address: {
          city: this.city,
          street: this.street,
          streetNo: this.streetNo
        },
        ratingRange: this.ratingRange,
        cuisine: this.selectedOptions.map(c => c.name)
      }
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  name: 'FilterObjects'
}
</script>

<style>
.label {
  text-align: left !important;
}
.multiselect__tags {
  border: 1px solid #ced4da !important;
}
</style>
