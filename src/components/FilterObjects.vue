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

    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      options: [
        { name: 'Vue.js', category: 'Front-end' },
        { name: 'Adonis', category: 'Backend' },
        { name: 'Rails', category: 'Backend' },
        { name: 'Sinatra', category: 'Backend' },
        { name: 'Laravel', category: 'Backend' },
        { name: 'Phoenix', category: 'Backend' }
      ],
      value: []
    }
  },

  name: 'FilterObjects'
}
</script>
