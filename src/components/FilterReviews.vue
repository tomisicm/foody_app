<template>
  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Review Title" class="mb-0">
        <b-input-group>
          <b-form-input v-model="form.title" placeholder="Type to Search"></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Review Author" class="mb-0">
        <b-input-group>
          <b-form-input v-model="form.author" placeholder="Type to Search"></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Catering" class="mb-0">
        <b-input-group>
          <b-form-input v-model="form.name" placeholder="Name"></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Place Address" class="mb-0">
        <b-input-group>
          <b-form-input v-model="form.city" placeholder="City"></b-form-input>
          <b-form-input v-model="form.street" placeholder="Street"></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Cuisine" class="mb-0">
        <b-input-group>
          <multiselect
            class="input-border"
            v-model="form.selectedOptions"
            :options="cuisine"
            :multiple="true"
            track-by="name"
            label="name"
            placeholder="Type to search"
          ><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group class="mb-0">
      <b-input-group>
        <div class="mx-3 mb-2">Michelin Stars</div>
        <b-form-checkbox class="mt-1 ml-2 mr-auto"
          v-model="form.hasMichelinStars"
          name="check-button" switch>
        </b-form-checkbox>

        <b-btn variant="primary" @click="onSearch">Search</b-btn>
      </b-input-group>
      </b-form-group>
    </b-col>

    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Filter by status" class="mb-0">
        <b-input-group>
          <multiselect
            class="input-border"
            v-model="form.approved"
            :options="filterByStatusOptions"
            track-by="value"
            label="name"
            placeholder="Type to search"
          >
          </multiselect>
        </b-input-group>
      </b-form-group>
    </b-col>

    <!--
    <b-col md="6" class="my-1">
      <b-form-group label-cols-sm="3" label="Catering name" class="mb-0">
        <b-input-group>
          <b-form-select v-model="sortBy" :options="sortOptions">
            <option slot="first" :value="null">-- none --</option>
        </b-form-select>
          <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
            <option :value="false">Asc</option> <option :value="true">Desc</option>
          </b-form-select>
        </b-input-group>
      </b-form-group>
    </b-col>
    -->
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      form: {
        title: '',
        name: '',
        approved: { name: 'Non-approved', value: true },
        city: '',
        street: '',
        selectedOptions: [],
        hasMichelinStars: false
      },
      filterValue: { name: 'All', value: true },
      filterByStatusOptions: [
        { name: 'All', value: false },
        { name: 'Non-approved', value: true }
      ]
    }
  },

  methods: {
    formatFilter () {
      return {
        title: this.form.title,
        name: this.form.name,
        approved: this.form.approved.value,
        catering: {
          address: {
            city: this.form.city,
            street: this.form.street
          },
          hasMichelinStars: this.form.hasMichelinStars,
          cuisine: this.form.selectedOptions.map(c => c.name)
        }
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
  }
}
</script>
