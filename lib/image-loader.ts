interface ImageLoaderParams {
  src: string
  width: number
  quality?: number
}

export default function imageLoader({ src }: ImageLoaderParams): string {
  if (src.startsWith('http')) return src
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${src}`
}
