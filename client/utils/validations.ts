export function urlify(str: string) {
  const words = str.split(' ')
  const regex = /(https?:\/\/[^\s]+)/g
  const res = words.map((word) => {
    if (word.match(regex)) {
      return `<a href="${word}">${word}</a>`
    }
    return word
  })
  return res.join(' ')
}