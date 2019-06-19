    <template>
  <b-form>
    <!-- brief instructions if the user has not created catering -->
    <b-row>
    <b-col md="7">
      <p class="h2">Basic information</p>
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
        <b-form-group label-cols-sm="3" label="Contact" class="mb-0">
          <b-input-group v-for="(contact, index) in form.contactInformation" :key="index" class="my-2">

              <b-form-input class="col-md-9" v-model="form.contactInformation[index]" placeholder="Phone or Email"></b-form-input>

              <div class="col-md-3">
                <b-btn variant="outline-danger" v-if="!contact && index > 0" @click="removeContact(contact)"> - </b-btn>
                <b-btn variant="primary" v-else @click="addContact" pill>+</b-btn>
                <!--
                  <b-btn variant="primary" v-if="!contact || index==0" @click="addContact" pill>+</b-btn>
                  <b-btn variant="outline-danger" v-if="contact || index > 0" @click="removeContact(contact)"> - </b-btn>
                -->
              </div>
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
              <b-form-checkbox v-model="form.checked" class="mt-2" name="check-button" switch/>
            </div>
            <div class="col-md-6">
              <b-form-input placeholder="Micheline stars"></b-form-input>
            </div>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Vue-Multiselect type-a-head #sub-asynchronous-select-->
      <b-col class="my-3" v-b-popover.hover.left="'Does the owner have account? Leave empty otherwise.'">
        <b-form-group label-cols-sm="3" label="Owner" class="mb-0">
          <b-input-group>
            <b-form-input placeholder="Enter owner"></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="my-3" v-b-popover.hover.left="'If checked, you will have edit rights if there is no owner.'">
        <b-form-group label-cols-sm="6" label="I will maintain this page?" class="mb-0">
          <b-input-group>
            <b-form-checkbox class="mt-2"></b-form-checkbox>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-col>

    <b-col md="5">
      <p class="h2">Pictures</p>
      <b-col class="my-3">

          <ListControlled
              :items="form.pictures"
            >
              <template v-slot:listitem="{item}">
                <b-row>
                  <b-col>{{item}}</b-col>
                  <b-col><b-btn variant="outline-danger" @click="removeItem(item)"> - </b-btn></b-col>
                </b-row>
              </template>
            </ListControlled>

      </b-col>
    </b-col>

    <b-col md="5">
      <p class="h2">Menu information</p>
    </b-col>

    </b-row>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'

import List from '@/components/List'
import ListControlled from '@/components/ListControlled'

export default {
  data () {
    return {
      form: {
        checked: false,
        contactInformation: [
          ''
        ],
        pictures: [
          { e: '' }, { e: '' }
        ]
      }
    }
  },

  methods: {
    addContact () {
      this.form.contactInformation.push('')
    },
    removeContact (contact) {
      const i = this.form.contactInformation.indexOf(contact)
      this.form.contactInformation.splice(i, 1)
    }
  },

  computed: {
    ...mapGetters('cuisineStore', ['cuisine'])
  },

  components: {
    /* List,  */ListControlled
  }

}
</script>
