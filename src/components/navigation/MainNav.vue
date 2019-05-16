<template>
  <b-row>
    <b-col cols="10">
      <b-navbar>
      <b-nav class="navbar-dark" align="left" tabs>
        <b-nav-item exact :to="{ name: 'home'}">Dashboard</b-nav-item>
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
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      routes: [
        { label: 'Dashboard', to: { name: 'home' } },
        { label: 'Reviews', to: { name: 'reviews' } }
      ],
      user: null
    }
  },

  mounted () {
    console.log(this.$route.path)
  }

}
</script>
