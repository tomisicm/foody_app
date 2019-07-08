<template>
  <b-row class="mt-2 mb-4">
    <slot name="button"><b-button :to="to" variant="primary"><font-awesome-icon icon="long-arrow-alt-left" /> Back</b-button></slot>
  </b-row>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    }
  }
}
</script>
