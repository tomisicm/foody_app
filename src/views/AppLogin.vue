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
            <small class="form-text text-muted">{{ errors.first('email') }}</small>
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
            <small class="form-text text-muted">{{ errors.first('password') }}</small>
          </div>
          <div class="form-row my-4">
            <button class="btn btn-primary">Signin</button>
          </div>
        </form>
      </b-col>
    </b-row>
    </b-container>
  </b-container>
</template>

<script>

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

  }

}
</script>
