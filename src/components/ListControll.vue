<template>
  <div class="my-3">
    <slot name="labelfield" />
    <b-row class="w-100">
      <slot name="inputfield" />

      <slot name="btnfield" />

      <slot name="inputerrors" />
    </b-row>

    <b-row>
      <div
        v-for="item in items"
        v-bind:key="item._id"
        :class="listitemclass"
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
    listitemclass: String,
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>
