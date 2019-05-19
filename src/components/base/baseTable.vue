<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      striped
      hover
    >
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },

  data () {

  }
}
</script>
