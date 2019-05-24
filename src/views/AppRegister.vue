<template>
  <b-container>
    <h2>Register</h2>

    <b-container class="justify-content-md-center text-center">
    <b-row>
      <b-col cols="8">
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
            >
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
          <div class="form-row">
            <label for="email">Confirm password:</label>
            <input
              v-model="form.passwordConfirm"
              v-validate="{ required: true }"
              type="password"
              class="form-control"
              name="passwordConfirm"
              id="passwordConfirm"
              aria-describedby="passwordConfirm"
              placeholder="Confirm password"
            >
            <small class="form-text text-danger">{{ errors.first('passwordConfirm') || firstError('passwordConfirm')}}</small>
          </div>
          <div class="form-row my-4">
            <button class="btn btn-primary" @click="handleRegister">Register</button>
          </div>
        </form>
      </b-col>
    </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },

  methods: {
    ...mapActions('authStore', ['register']),
    ...mapActions('errorsStore', ['handleError', 'clearErrors']),
    async handleRegister () {
      try {
        await this.register(this.form)
      } catch (error) {
        // TODO: refractor and clear noise

        const { response } = error

        const errorMsg = response.data.details[0].message
        const errorKey = response.data.details[0].context.key

        let newError = {}
        newError[errorKey] = errorMsg

        await this.handleError(newError)
        console.log(this.$store.getters['errorsStore/errors'])
      }
    }
  },

  computed: {
    ...mapGetters('errorsStore', ['firstError', 'hasErrors'])
  }

}
</script>
