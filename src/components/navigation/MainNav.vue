<template>
  <b-row>
    <b-col cols="10">
      <b-nav class="navbar-dark" align="left" tabs>
        <b-nav-item active>
          <router-link class="nav-item" :to="{ name: 'home'}">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-item" :to="{ name: 'reviews'}">Reviews</router-link>
        </b-nav-item>
      </b-nav>
    </b-col>

    <b-col cols="2">
      <b-nav class="navbar-dark" align="right">
        <template v-if="!user">
          <b-nav-item-dropdown
            text="User"
            right
          >
            <b-dropdown-item>Login</b-dropdown-item>
            <b-dropdown-item>Register</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>

        <template v-else>
          <b-nav-item-dropdown
            text="User"
            right
          >
            <b-dropdown-item> {{user}} </b-dropdown-item>
            <b-dropdown-item>Profile</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-nav>
    </b-col>

  </b-row>
</template>

<script>
export default {
  data () {
    return {
      user: null
    }
  }
}
</script>
