<template>
  <b-container>
    <h2>Signin</h2>

    <b-row class="text-center">
    <b-col></b-col>
    <b-col cols="8">

<form v-on:submit.prevent>
      <div class="form-row">
        <label for="email">Email:</label>
        <input v-model="email" type="text" class="form-control" id="email" aria-describedby="city" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-row">
        <label for="email">Password:</label>
        <input v-model="password" type="text" class="form-control" id="email" aria-describedby="password" placeholder="Enter password">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <div class="form-row">
        <label for="email">Confirm password:</label>
        <input v-model="passwordConfirm" type="text" class="form-control" id="email" aria-describedby="passwordConfirm" placeholder="Confirm password">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>
      <div class="form-row">
        <button class="btn">Clear</button>
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>

    </b-col>
    <b-col></b-col>
  </b-row>

  </b-container>
</template>

<script>
export default {

}
</script>
