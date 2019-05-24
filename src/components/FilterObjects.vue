<template>
  <div class="text-align:left">
    <form v-on:submit.prevent>
      Filter the Objects:
      <div class="form-row">
        <label for="city">City:</label>
        <input
          v-model="city"
          type="text"
          class="form-control"
          id="city"
          aria-describedby="city"
          placeholder="Enter city">
      </div>

      <div class="form-row">
        <label for="street">Street:</label>
        <input v-model="street"
          type="text"
          class="form-control"
          id="street"
          aria-describedby="street"
          placeholder="Enter street">
      </div>

      <div class="form-row">
        <label for="streetNo">Street:</label>
        <input
          v-model="streetNo"
          type="text"
          class="form-control"
          id="streetNo"
          aria-describedby="streetNo"
          placeholder="Enter street number">
      </div>

      <div class="form-row">
        <label for="type">Origin:</label>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          track-by="name"
          label="name"
          placeholder="Type to search"
        >
          <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
        </multiselect>
      </div>

      <div class="form-row">
        <label class="w-100" id="categories">Categories:</label>
        <div class="form-group col-md-6">
          <input type="checkbox" id="food" value="food" v-model="checkedCategories">
          <label for="food">Food</label>
        </div>
        <div class="form-group col-md-6">
          <input type="checkbox" id="drink" value="drink" v-model="checkedCategories">
          <label for="drink">Drinks</label>
        </div>
      </div>

      <div class="form-row">
        <label class="w-100" id="rating">Selected rating: {{ratingRange[0]}} - {{ratingRange[1]}}</label>
        <vueslider class="w-100" v-model="ratingRange" :min=0 :max=10 :interval=0.1  />
      </div>

      <div class="form-row my-4">
        <button class="btn btn-primary mr-3" type="submit" v-on:click="onSubmit()">Search</button>
        <button class="btn btn-outline-primary">Clear Filters</button>
      </div>

    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      options: [
        { name: 'Thai', category: 'Front-end' },
        { name: 'Chinese', category: 'Backend' },
        { name: 'Itallian', category: 'Backend' },
        { name: 'Fast-food', category: 'Backend' }
      ],
      city: '',
      street: '',
      streetNo: null,
      value: [],
      checkedCategories: [],
      ratingRange: [0, 10]
    }
  },

  methods: {
    onSubmit () {
      console.log(this.getFilter())
    },

    getFilter () {
      return {
        street: this.street,
        city: this.city,
        categories: this.checkedCategories,
        ratingRange: this.ratingRange,
        type: this.value
      }
    }
  },

  name: 'FilterObjects'
}
</script>
