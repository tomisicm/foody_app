<template>
  <b-container>
    <h2>Signin</h2>

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
          <div class="form-row my-4">
            <button class="btn btn-primary" @click="onSubmit">Signin</button>
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
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('authStore', ['login']),
    ...mapActions('errorsStore', ['handleError', 'clearErrors']),
    async onSubmit () {
      try {
        await this.login(this.form)
      } catch (error) {
        // TODO: refractor and clear noise
        const { response } = error

        const errorMsg = response.data.message
        const errorKey = response.data.context ? response.data.context.key : 'email'

        let newError = {}
        newError[errorKey] = errorMsg

        await this.handleError(newError)
        // console.log(this.$store.getters['errorsStore/errors'])
      }
    }
  },

  computed: {
    ...mapGetters('errorsStore', ['firstError', 'hasErrors'])
  },

  watch: {
    'form.email' (value) {
      this.clearErrors('email')
    },

    'form.password' (value) {
      this.clearErrors('password')
    }
  }
}
</script>
