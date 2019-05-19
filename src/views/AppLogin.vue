<template>
  <b-container>
    <h2>Signin</h2>

    <b-row cols="8" class="justify-content-md-center text-center">
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
        <div class="form-row my-4">
          <button class="btn mr-4">Clear</button>
          <button class="btn btn-primary">Submit</button>
        </div>
      </form>
    </b-row>
  </b-container>
</template>

<script>
export default {

}
</script>
