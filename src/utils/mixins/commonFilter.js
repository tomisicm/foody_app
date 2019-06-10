const commonFilter = {
  methods: {
    getParams () {
      return {
        page: this.page,
        perPage: this.perPage
      }
    }
  }
}
export default commonFilter
