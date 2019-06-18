<template>
  <b-container>
      <keep-alive>
        <b-tabs pills>
          <b-tab title="Add New" active>

            <NewCateringForm/>

          </b-tab>
          <b-tab title="Added by me">
            <div>Added by me section</div>
          </b-tab>
        </b-tabs>
      </keep-alive>
  </b-container>
</template>

<script>
import NewCateringForm from '@/components/NewCateringForm'

export default {
  data () {
    return {

    }
  },

  components: {
    NewCateringForm
  }
}
</script>
