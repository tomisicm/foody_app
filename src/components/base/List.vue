<template>
  <div v-if="items.length">
    <div
      v-for="item in items"
      v-bind:key="item._id"
      no-body
      class="overflow-hidden"
    >

      <slot
        name="listitem"
        :item="item"
      />

    </div>
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
    }
  },

  name: 'baseList'
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
.item-text {
  text-align:left;
}
</style>
