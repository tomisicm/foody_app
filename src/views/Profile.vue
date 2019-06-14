<template>
  <b-container class="mt-2">
    Profile Page:
    <b-form>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Name" class="mb-0">
          <b-input-group>
            <b-form-input v-model="form.username" placeholder="Username"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Profession" class="mb-0">
          <b-input-group>
            <b-form-input v-model="form.username" placeholder="Profession"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        profession: ''
      }
    }
  }
}
</script>
