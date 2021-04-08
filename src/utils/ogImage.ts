export const buildOgImageUrl = (
  caption: string,
  isMarkdown: boolean = false
) => {
  let url = `https://og-image-three-iota.vercel.app/${encodeURIComponent(
    caption
  )}.png`

  if (isMarkdown) {
    url = `${url}?md=true`
  }

  return url
}
