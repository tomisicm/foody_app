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

      <!-- address component is repeating -->
      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Address" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="City"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-row class="mt-3">
          <div class="col-md-8">
            <b-form-input v-model="form.street"
              type="text"
              class="form-control"
              id="street"
              aria-describedby="street"
              placeholder="Street name"
            />
          </div>
          <div class="col-md-4">
            <b-form-input
              v-model="form.streetNo"
              type="text"
              class="form-control"
              id="streetNo"
              aria-describedby="streetNo"
              placeholder="Number"
            />
          </div>
        </b-form-row>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Contact information" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Phone or Email"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Cusine" class="mb-0">
            <b-input-group>
              <multiselect
                class="input-border"
                v-model="form.selectedOptions"
                :options="cuisine"
                :multiple="true"
                track-by="name"
                label="name"
                placeholder="Type to search"
              >
              <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
            </multiselect>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3">
        <b-form-group label-cols-sm="3" label="Micheline stars" class="mb-0">
          <b-input-group>
            <div class="col-md-6">
              <b-form-checkbox v-model="checked" class="mt-2" name="check-button" switch/>
            </div>
            <div class="col-md-6">
              <b-form-input placeholder="Micheline stars"></b-form-input>
            </div>
          </b-input-group>
        </b-form-group>
      </b-col>

    </b-col>

    </b-row>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      form: {

      }
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

}
</script>
