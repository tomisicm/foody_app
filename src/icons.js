import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faEdit,
  faSave,
  faCheck,
  faReply,
  faArrowUp,
  faArrowDown,
  faExternalLinkSquareAlt,
  faLock,
  faLockOpen,
  faLongArrowAltLeft,
  faSmile,
  faThumbsUp,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTrash,
  faEdit,
  faSave,
  faReply,
  faCheck,
  faArrowUp,
  faArrowDown,
  faExternalLinkSquareAlt,
  faLock,
  faLockOpen,
  faLongArrowAltLeft,
  faSmile,
  faThumbsUp,
  faWindowMinimize
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default Vue
