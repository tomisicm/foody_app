<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button block href="#" v-b-toggle="id" variant="btn btn-primary">
        <font-awesome-icon class="when-opened" icon="arrow-up" />
        <font-awesome-icon class="when-closed" icon="arrow-down" />
        {{headline}}
      </b-button>
    </b-card-header>

    <b-collapse :id="id" visible role="tabpanel">
      <b-card-body>

        <slot name="mainbody" />

        <slot name="additionalbody" />

      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  props: {
    headline: String,
    label: String,
    id: {
      type: String,
      required: true
    },
    inEditMode: Boolean
  },

  data () {
    return {
      review: {
        generalImpression: 'dasa'
      }
    }
  }

}
</script>

<style>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
