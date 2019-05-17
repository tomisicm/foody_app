<template>
  <div class="text-align:left">
    <form>
      Filter the Objects:
      <div class="form-row">
        <label for="city">City:</label>
        <input type="text" class="form-control" id="city" aria-describedby="city" placeholder="Enter city">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>

      <div class="form-row">
        <label for="type">Object type:</label>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          placeholder="Type to search"
          track-by="name"
          label="name">
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

    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      options: [
        { name: 'Diner', category: 'Front-end' },
        { name: 'Restaurant', category: 'Backend' },
        { name: 'Vine Cellar', category: 'Backend' }
      ],
      value: [],
      checkedCategories: []
    }
  },

  name: 'FilterObjects'
}
</script>
