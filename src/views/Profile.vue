<template>
  <b-container class="mt-2">
    Profile Page:
    <b-form>
      <b-row md="8">
        <b-col>
          <b-col class="my-2">
            <b-form-group label-cols-sm="3" label="Name" class="mb-0">
              <b-input-group>
                <b-form-input v-model="form.username" placeholder="Username"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col class="my-2">
            <b-form-group label-cols-sm="3" label="Profession" class="mb-0">
              <b-input-group>
                <b-form-input
                  v-model="form.username"
                  placeholder="Profession"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col class="my-2">
            <b-form-group label="Avatar" class="mb-0">
              <b-form-file
                accept="image/jpeg, image/png, image/gif"
                placeholder="Choose picture">
              </b-form-file>
            </b-form-group>
          </b-col>
        </b-col>

        <b-col>dicc</b-col>

      </b-row>
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
