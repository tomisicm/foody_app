import moment from 'moment'

const dateToString = {
  filters: {
    formatDate: function (date, format = 'MMM, YYYY') {
      return moment(date).format(format)
    }
  }
}
export default dateToString
