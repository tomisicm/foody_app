<template>
  <div class="text-align:left">
    <form v-on:submit.prevent>
      Find cuisine:
      <b-form-group label-cols-sm="3" label="Name" class="mb-0">
        <b-input-group>
          <b-form-input
            v-model="form.name"
            type="text"
            placeholder="Foody place name"
          />
        </b-input-group>
      </b-form-group>

      <Address
        :address="form.address"
        @update:address="form.address = $event"
      />

      <div class="form-row">
        <label class="col-md-12 label" for="type">Origin:</label>
        <div class="col-md-12">
          <multiselect
            class="input-border"
            v-model="form.selectedOptions"
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
        <label class="col-md-12 label" id="rating">Selected rating: {{form.ratingRange[0]}} - {{form.ratingRange[1]}}</label>
        <div class="col-md-12">
          <vueslider class="w-100" v-model="form.ratingRange" :min=0 :max=10 :interval=0.1  />
        </div>
      </div>

      <div class="form-row my-4">
        <button class="btn btn-primary mr-3" type="submit" @click="onSearch">Search</button>
        <button class="btn btn-outline-primary">Clear Filters</button>
      </div>

    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Address from '@/components/parts/Address'

export default {
  data () {
    return {
      form: {
        selectedOptions: [],
        name: '',
        address: {
          city: '',
          street: '',
          streetNo: null
        },
        ratingRange: [0, 10]
      }
    }
  },

  methods: {
    formatFilter () {
      return {
        name: this.form.name,
        address: {
          city: this.form.city,
          street: this.form.street,
          streetNo: this.form.streetNo
        },
        ratingRange: this.form.ratingRange,
        cuisine: this.form.selectedOptions.map(c => c.name)
      }
    },

    onSearch () {
      this.$emit('onSearch')
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  watch: {
    'form': {
      handler () {
        this.$emit('update:filterCriteria', this.formatFilter())
      },
      deep: true
    }
  },

  created () {
    this.$emit('update:filterCriteria', this.formatFilter())
  },

  components: {
    Address
  },

  name: 'FilterCatering'
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
