export const clamp = (value, min, max) => Math.max(Math.min(value, max), min)

export const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci magna, fermentum eu scelerisque id, efficitur ut dui. Sed mattis aliquet placerat. Integer imperdiet, eros et semper malesuada, sapien lorem luctus erat, ac auctor erat velit sed odio. Quisque efficitur nulla sed tortor dictum, vitae lobortis turpis pharetra. Sed et tempor tellus, non accumsan enim. Curabitur scelerisque erat dignissim turpis commodo ullamcorper. Curabitur malesuada nibh in facilisis consectetur. Curabitur non luctus nunc, vitae rutrum risus. In sed mi leo. Vivamus tempor tellus quis velit sagittis bibendum. Mauris eu suscipit augue. In id nunc nisl.'

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
