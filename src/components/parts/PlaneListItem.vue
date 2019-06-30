<template>
  <b-card class="w-100 ml-3">
    <b-row>
      <b-col md="10">
        {{item}}
      </b-col>

      <b-col class="pl-0 pr-0" md="2">
        <b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    item: String,
    classes: String
  },

  methods: {
    removeItem (item) {
      this.$emit('removeitem', item)
    }
  }
}
</script>
