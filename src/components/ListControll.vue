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

    <div v-for="item in items"  v-bind:key="item._id" no-body class="overflow-hidden my-2">

      <b-col>
        <slot
          name="listitem"
          :item="item"
        />
      </b-col>

    </div>

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
