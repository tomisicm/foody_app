<template>
<div>
  <b-card no-body class="my-2">
    <b-form-textarea
      v-model="body"
      placeholder="New comment..."
      rows="3"
      max-rows="6"
    />
  </b-card>
  <b-container>
    <b-row>
      <b-btn v-if="body" class="mr-auto my-2">Send</b-btn>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      body: ''
    }
  }
}
</script>
