<template>
  <b-row>
    <b-col cols="10">
      <b-navbar>
      <b-nav class="navbar-dark" align="left" tabs>
        <b-nav-item exact :to="{ name: 'home'}">Welcome</b-nav-item>
        <b-nav-item exact :to="{ name: 'dashboard'}">Dashboard</b-nav-item>
        <b-nav-item :to="{ name: 'reviews'}">Reviews</b-nav-item>
        <b-nav-item :to="{ name: 'reviews'}">Reviewers</b-nav-item>
      </b-nav>
      </b-navbar>
    </b-col>

    <b-col cols="2">
      <b-navbar>
      <b-nav class="navbar-dark" align="right" tabs>
        <template v-if="!user">
          <b-nav-item-dropdown
            text="User"
            right
          >
            <b-dropdown-item>
              <b-nav-item :to="{ name: 'signin'}">Signin</b-nav-item>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-nav-item :to="{ name: 'register'}">Register</b-nav-item>
            </b-dropdown-item>
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
      </b-navbar>
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
