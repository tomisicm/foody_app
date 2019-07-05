<template>
  <modal
    name="confirm-action"
    transition="nice-modal-fade"
  >
    <b-card :title="title" class="h-100">

      <b-card-body>
        <slot name="body" />
      </b-card-body>

      <slot slot="footer">
        <b-row>
          <b-col cols="auto" class="mr-auto"/>
          <b-col cols="auto">
            <b-button variant="outline-success">Cancel</b-button>
          </b-col>
          <b-col cols="auto">
            <b-button variant="success">Confirm</b-button>
          </b-col>
        </b-row>
      </slot>
    </b-card>
  </modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Confirm Action'
    }
  },

  name: 'AppModal'
}
</script>
