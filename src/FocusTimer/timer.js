import state from "./state.js"
import * as elements from "./elements.js"
import { reset } from "./actions.js"
import { kitchenTimer } from "./sounds.js"

const MINIMUM_MINUTES = 5;
const MAXIMUM_MINUTES = 60;

export const countDown = () => {
  clearTimeout(state.countDownId)

  if(!state.isRunning) {
    return
  }

  let minutes = Number(elements.minutes.textContent)
  let seconds = Number(elements.seconds.textContent)

  seconds--

  if(seconds < 0) {
    seconds = 59
    minutes--
  }

  if(minutes < 0) {
    reset()
    kitchenTimer.play()
    return
  }

  updateDisplay(minutes, seconds)

  state.countDownId = setTimeout(() => countDown(), 1000)
}

export const adjustTimer = (adjustment) => {
  let currentMinutes = Number(elements.minutes.textContent);
  const newMinutes = currentMinutes + adjustment;

  if (newMinutes < MINIMUM_MINUTES || newMinutes > MAXIMUM_MINUTES) {
    let errorMessage;


    if (adjustment > 0) {
      errorMessage = `O tempo máximo permitido é de ${MAXIMUM_MINUTES} minutos.`;
    } else {
      errorMessage = `O tempo mínimo permitido é de ${MINIMUM_MINUTES} minutos.`;
    }

    alert(errorMessage);
    return;
  }

  updateDisplay(newMinutes, 0);
}

export const updateDisplay = (minutes, seconds) => {
  minutes = minutes ?? state.minutes
  seconds = seconds ?? state.seconds

  elements.minutes.textContent = String(minutes).padStart(2, "0")
  elements.seconds.textContent = String(seconds).padStart(2, "0")
}