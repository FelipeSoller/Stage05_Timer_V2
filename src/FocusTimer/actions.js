import state from "./state.js"
import * as sounds from "./sounds.js";
import * as elements from "./elements.js"
import * as timer from "./timer.js"

export const toggleRunning = () => {
  state.isRunning = document.documentElement.classList.toggle('running')
  timer.countDown()
  sounds.buttonPressAudio.play()
}

export const reset = () => {
  state.isRunning = false
  document.documentElement.classList.remove('running')
  sounds.buttonPressAudio.play()
  timer.updateDisplay()
}

export const increaseTime = () => {
  timer.adjustTimer(5)
  sounds.buttonPressAudio.play()
}

export const decreaseTime = () => {
  timer.adjustTimer(-5)
  sounds.buttonPressAudio.play()
}

export const selectSound = (action) => {
  const selectedSound = document.querySelector(`.${action}`)
  const isAlreadyPlaying = selectedSound.classList.contains('playing')

  elements.allSoundButtons.forEach((element) => element.classList.remove('playing'));
  Object.values(sounds).forEach((sound) => sound.pause());

  state.isMuted = !isAlreadyPlaying;
  selectedSound.classList.toggle('playing', !isAlreadyPlaying);

  if (sounds[action]) {
    if (!isAlreadyPlaying) {
      sounds[action].play();
    } else {
      sounds[action].pause();
    }
  }
};