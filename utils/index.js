export const clamp = (value, min, max) => Math.max(Math.min(value, max), min)

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomRGBA(opacity = 0.2) {
  return `
    rgba(
      ${randomIntFromInterval(0, 255)},
      ${randomIntFromInterval(0, 255)},
      ${randomIntFromInterval(0, 255)},
      ${opacity}
    )
  `
}
