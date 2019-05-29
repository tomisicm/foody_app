<template>
  <div>
    <b-card v-for="item in items.docs"  v-bind:key="item._id" no-body class="overflow-hidden">

      <slot
        name="listitem"
        :item="item"
      />

    </b-card>
    <div cols="12">
      <b-pagination
        v-model="items.page"
        :total-rows="items.total"
        :per-page="items.limit"
        @change="updatePage($event)"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Object,
      default: function () {
        return {
          page: 1,
          total: 1,
          limit: 10
        }
      }
    }
  },

  methods: {
    updatePage (event) {
      this.$emit(`update:page`, event)
    }
  }

}
</script>

<style>
.avatar {
  width: 50px;
  height: 50px;
}
.item-text {
  text-align:left
}
</style>
