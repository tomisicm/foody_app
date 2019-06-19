<template>
  <b-row>
    <b-col cols="10">
      <b-navbar>
      <b-nav class="navbar-dark" align="left" tabs>
        <b-nav-item exact :to="{ name: 'home'}">Welcome</b-nav-item>
        <b-nav-item exact :to="{ name: 'caterings'}">Foody Places</b-nav-item>
        <b-nav-item :to="{ name: 'reviews'}">Reviews</b-nav-item>
        <b-nav-item :to="{ name: 'reviews'}">Reviewers</b-nav-item>
      </b-nav>
      </b-navbar>
    </b-col>

    <b-col cols="2">
      <b-navbar>
      <b-nav class="navbar-dark" align="right" tabs>
        <template v-if="!isSignedIn">
          <b-nav-item-dropdown
            text="User"
            right
          >
            <b-dropdown-item :to="{ name: 'signin'}">Signin</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'register'}">Register</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>

        <template v-else>
          <b-nav-item-dropdown
            text="User"
            right
          >
            <b-dropdown-item :to="{ name: 'profile'}">Profile Settings</b-dropdown-item>
            <b-dropdown-item>Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
      </b-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('authStore', ['isSignedIn'])
  },

  name: 'Main_Navigation_Bar'
}
</script>
