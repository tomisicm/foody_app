// 3 types of errors
// 1. mongo
// 2. joi
// 3. unique-validators and other pre hooks

// TODO: this should totally be on the backend
export function getErrorMessageObject (errorObject) {
  const { response } = errorObject
  const { data } = response

  let newError = {}

  if (data.isJoi) {
    const errorMsg = data.details[0].message
    const errorKey = data.details[0].context.key
    newError[errorKey] = errorMsg
    return newError
  } else {
    const errorKey = Object.keys(data.errors)[0]
    const errorMsg = Object.values(data.errors)[0].message
    newError[errorKey] = errorMsg
    return newError
  }
}
