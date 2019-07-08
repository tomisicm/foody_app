<template>
  <form v-on:submit.prevent>
    <b-card
      title="Search for cuisine: "
    >
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
      @update:address="updateAddress($event)"
    />

    <b-form-group label-cols-sm="3" label="Origin" class="mb-0">
      <b-input-group>
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
      </b-input-group>
    </b-form-group>

    <b-form-group label-cols-sm="3" label="Rating range" class="mb-0">
      <slot name="label">
        <div class="mt-2">
        Selected rating: {{form.ratingRange[0]}} - {{form.ratingRange[1]}}
        </div>
      </slot>
        <vueslider class="w-100" v-model="form.ratingRange" :min=0 :max=10 :interval=0.1  />
    </b-form-group>

    <div class="form-row my-4">
      <button class="btn btn-primary mr-3" type="submit" @click="onSearch">Search</button>
      <button class="btn btn-outline-primary">Clear Filters</button>
    </div>
    </b-card>
  </form>
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
        address: this.form.address,
        ratingRange: this.form.ratingRange,
        cuisine: this.form.selectedOptions.map(c => c.name)
      }
    },

    updateAddress (address) {
      this.form.address = address
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
