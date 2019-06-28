<template>
  <b-col class="my-3">
    <slot name="labelfield" />
    <b-row>

      <slot name="inputfield" />

      <b-col class="col-md-2">
        <b-btn variant="primary" @click="addItem" :disabled="error" pill>+</b-btn>
      </b-col>

      <slot name="inputerrors" />
    </b-row>

    <b-card v-for="item in items"  v-bind:key="item._id" no-body class="overflow-hidden my-2">
      <b-row>
        <b-col md="9">
          <slot
            name="listitem"
            :item="item"
          />
        </b-col>

        <b-col md="3">
          <b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn>
        </b-col>
      </b-row>

    </b-card>

  </b-col>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      newItem: ''
    }
  },

  methods: {
    addItem () {
      this.$emit('additem')
    },

    removeItem (item) {
      this.$emit('removeitem', item)
    }
  }
}
</script>
