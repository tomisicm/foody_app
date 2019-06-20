import { Rules } from 'vee-validate'

export const phoneOrEmailRule = {
  getMessage (field, args) {
    return `The ${field} must be either a valid phone number or e-mail`
  },

  validate (value, args) {
    const MOBILEREG = /^((1[3578][0-9])+\d{8})$/

    return MOBILEREG.test(value) || Rules.email.validate(value)
  }
}
