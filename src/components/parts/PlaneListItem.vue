<template>
  <b-card class="w-100 ml-3">
    <b-row>
      <b-col md="9">
        {{item}}
      </b-col>

      <b-col md="3">
        <b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    item: String
  },

  methods: {
    removeItem (item) {
      this.$emit('removeitem', item)
    }
  }
}
</script>
