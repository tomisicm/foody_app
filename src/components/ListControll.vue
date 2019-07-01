<template>
  <div class="my-3">
    <b-row>
      <slot name="labelfield" />
      <b-row class="w-100">
        <slot name="inputfield" />

        <slot name="btnfield" />

        <slot name="inputerrors" />
      </b-row>

      <div
        v-for="item in items"
        v-bind:key="item._id"
        :class="classes"
      >
        <slot
          name="listitem"
          :item="item"
        />
      </div>

    </b-row>

  </div>
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
    },
    classes: String
  },

  data () {
    return {}
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
