import * as elements from './elements.js'
import * as actions from './actions.js'

export const registerControls = () => {
  elements.controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action

    if(typeof actions[action] !== 'function') {
      return
    }

    actions[action]()
  })
}

export const registerSounds = () => {
  elements.sounds.addEventListener('click', (event) => {
    const action = event.target.dataset.action
    const type = event.target.dataset.type

    if(typeof actions[type] !== 'function') {
      return
    }

    actions[type](action)
  })
}