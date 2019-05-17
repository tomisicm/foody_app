<template>
  <div class="text-align:left">
    <form>
      Filter the Objects:
      <div class="form-row">
        <label for="city">City:</label>
        <input type="text" class="form-control" id="city" aria-describedby="city" placeholder="Enter city">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>

      <div class="form-row">
        <label for="type">Object type:</label>
        <input type="text" class="form-control" id="type" aria-describedby="typeOfObject" placeholder="Enter object type">
        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'FilterObjects'
}
</script>
