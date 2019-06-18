<template>
  <b-form>
    <!-- brief instructions if the user has not created catering -->
    <b-row>
    <b-col md="8">

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Name " class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Enter name of foody place"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Address" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="City"></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-row class="mt-3">
          <div class="col-md-8">
            <input v-model="form.street"
              type="text"
              class="form-control"
              id="street"
              aria-describedby="street"
              placeholder="Street name"
            >
          </div>
          <div class="col-md-4">
            <input
              v-model="form.streetNo"
              type="text"
              class="form-control"
              id="streetNo"
              aria-describedby="streetNo"
              placeholder="Number"
            >
          </div>
        </b-form-row>
      </b-col>
    </b-col>

    </b-row>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {

      }
    }
  },

}
</script>
