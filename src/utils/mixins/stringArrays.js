const arrayToString = {
  filters: {
    formatArray: function (arr, prop) {
      return arr.map(el => ' ' + el[prop]).toString()
    }
  }
}
export default arrayToString
