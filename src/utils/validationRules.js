import { Rules } from 'vee-validate'

export const phoneOrEmailRule = {
  getMessage (field, args) {
    return `The ${field} must be either a valid phone number or e-mail`
  },

  validate (value, args) {
    // eslint-disable-next-line no-useless-escape
    const MOBILEREG = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    /* https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript */

    return MOBILEREG.test(value) || Rules.email.validate(value)
  }
}
