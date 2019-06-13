<template>
  <b-container>
    <div>
      <h1>{{cateringFacility && cateringFacility.name}}</h1>
    </div>

    <baseCarousel class="my-4" />

    <div>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia optio facilis voluptas accusantium maxime quam, repellendus, in odit facere nesciunt quo laboriosam nisi magnam officia voluptatibus eum iusto? Dolorem, magni.</p>
        <p>Located on {{cateringFacility && cateringFacility.address.street + cateringFacility.address.streetNo}}, {{cateringFacility && cateringFacility.address.city}}.
          Famous for its {{cateringFacility && cateringFacility.cuisine.name }} cuisine and {{cateringFacility && cateringFacility.michelinStars }} Michelin Stars.
        </p>
      </div>

      <b-container>
        <b-row class="mx-2">
          <span class="pt-1">Add review:</span>
          <b-button :to="{ name: 'addreview', query: { item: this.$route.params.id } }" pill variant="primary" class="mx-2"> + </b-button>
        </b-row>
      </b-container>

      <b-card no-body class="my-4 w-100">
        <b-tabs card fill class="nav-item">
          <b-tab title="Reviews" active>

            <List
              :items="reviews.docs"
              @update:page="updateReviewsPage($event)"
            >
              <template v-slot:listitem="{item}">
                <SingleReview :item="item"/>
              </template>
            </List>

            <div cols="12">
              <b-pagination
                v-model="reviews.page"
                :total-rows="reviews.total"
                :per-page="reviews.limit"
                @change="updateReviewsPage($event)"
              />
            </div>

          </b-tab>
          <b-tab title="Comments">

            <NewComment>

              <template v-slot:input-field>
                <b-form-textarea
                  v-model="body"
                  placeholder="New comment..."
                  rows="1"
                  max-rows="2"
                  :style="{ overflowY: 'none' }"
                />
              </template>

            </NewComment>

            <List
              class="my-1"
              :items="comments.docs"
              @update:page="updateCommentsPage($event)"
            >
              <template v-slot:listitem="{ item }">
                <SingleComment
                  :item="item"
                  @editItem="handleEditComment($event)"
                  @removeItem="handleRemoveComment($event)"
                />
              </template>
            </List>

            <div cols="12">
              <b-pagination
                v-model="comments.page"
                :total-rows="comments.total"
                :per-page="comments.limit"
                @change="updateCommentsPage($event)"
              />
            </div>

          </b-tab>
        </b-tabs>
      </b-card>

    </div>
  </b-container>
</template>

<script>
import cateringService from '@/utils/services/catering-service'
import reviewService from '@/utils/services/review-service'
import commentService from '@/utils/services/comment-service'

import { mapGetters, mapActions } from 'vuex'

import baseCarousel from '@/components/baseCarousel'
import List from '@/components/List'
import SingleReview from '@/components/SingleReview'
import SingleComment from '@/components/SingleComment'
import NewComment from '@/components/NewComment'

export default {
  data () {
    return {
      cateringFacility: null,
      reviews: {
        docs: [],
        page: 1,
        perPage: 10
      }
    }
  },

  methods: {
    ...mapActions('commentStore', ['getCommentsByItemId']),
    handleRemoveComment (event) {
      console.log(event)
    },
    async handleEditComment (event) {
      await commentService.editComment(event)
    },

    async getCateringData () {
      const { data } = await cateringService.getCatering(this.$route.params.id)
      this.cateringFacility = data
    },

    async getReviews () {
      const { data } = await reviewService.getReviewsByItemId(this.$route.params.id, this.getReviewParams())
      this.reviews = data
    },

    getReviewParams () {
      return {
        page: this.reviews.page,
        perPage: this.reviews.limit
      }
    },

    getCommentParams () {
      
      return {
        page: this.comments.page,
        perPage: this.comments.limit
      }
    },

    updateReviewsPage (event) {
      this.reviews.page = event
      this.getReviews()
    },

    updateCommentsPage (event) {
      this.comments.page = event
      this.getCommentsByItemId({ itemId: this.$route.params.id, params: this.getCommentParams() })
    }
  },

  computed: {
    ...mapGetters('commentStore', ['comments'])
  },

  created () {
    this.getCateringData()
    this.getReviews()

    this.getCommentsByItemId({ itemId: this.$route.params.id, params: this.getCommentParams() })
  },

  components: {
    baseCarousel, List, SingleReview, SingleComment, NewComment
  },

  name: 'CateringFacility'
}
</script>
