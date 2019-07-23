<template>
  <div :class="[{ editable: inEditMode }, classes]"
    :contenteditable="inEditMode"
    :placeholder="placeholder"
    @blur="update"
  />
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: 'px-3 py-3'
    },
    content: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Enter text here...'
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

<style>
div.editable {
  border: 1px solid #ced4da !important;
}

[contenteditable=true]:empty:before {
  content: attr(placeholder);
  display: block;
}

</style>
