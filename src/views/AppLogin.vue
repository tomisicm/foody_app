<template>
  <b-container>
    <h2>Signin</h2>

    <b-container class="justify-content-md-center text-center">
    <b-row>
      <b-col cols="8"  md="6">
        <form v-on:submit.prevent>
          <div class="form-row">
            <label for="email">Email:</label>
            <input
              v-model="form.email"
              v-validate="{ required: true, email: true }"
              type="email"
              class="form-control"
              name="email"
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
            />
            <small class="form-text text-danger">{{ errors.first('email') || firstError('email') }}</small>
          </div>

          <div class="form-row">
            <label for="password">Password:</label>
            <input
              v-model="form.password"
              v-validate="{ required: true }"
              type="password"
              class="form-control"
              name="password"
              id="password"
              aria-describedby="password"
              placeholder="Enter password"
            >
            <small class="form-text text-danger">{{ errors.first('password') || firstError('password') }}</small>
          </div>
          <div class="form-row my-4">
            <button
              @click="handleLogin"
              :disabled="!readyForSubmition"
              class="btn btn-primary"
            >
              Signin
            </button>
          </div>
        </form>
      </b-col>
    </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import { getErrorMessageObject } from '@/utils/services/error-handler'

export default {
  props: {
    userEmail: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      form: {
        email: this.userEmail || '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('authStore', ['login']),
    ...mapActions('errorsStore', ['handleError', 'clearErrors']),
    async handleLogin () {
      try {
        await this.login(this.form)
      } catch (error) {

        const newError = getErrorMessageObject(error)

        await this.handleError(newError)
      }
    }
  },

  computed: {
    ...mapGetters('errorsStore', ['firstError', 'hasErrors']),

    readyForSubmition () {
      const { email, password } = this.form
      return !_.isEmpty(email) && !_.isEmpty(password)
    }
  },

  watch: {
    'form.email' (value) {
      this.clearErrors('email')
    },

    'form.password' (value) {
      this.clearErrors('password')
    }
  },

  name: 'Login'
}
</script>
