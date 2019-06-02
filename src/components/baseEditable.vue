<template>
  <div
    :contenteditable="inEditMode"
    @blur="update"
  />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    inEditMode: Boolean,
    default: function () {
      return false
    }
  },

  methods: {
    update: function (event) {
      this.$emit('update', event.target.innerText)
    }
  },

  mounted: function () {
    this.$el.innerText = this.content
  },

  watch: {
    content: function () {
      this.$el.innerText = this.content
    }
  }
}
</script>
