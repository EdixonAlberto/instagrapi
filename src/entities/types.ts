export type TConfig = {
  sessionId: string
  proxy?: string
}

export type TProfile = {
  username: string
  name: string
  image: {
    standard: string
    hd: string
  }
  qtyPosts: number
  followers: number
  following: number
  biography: string
  externalUrl: string
  isBusiness: boolean
  isVerified: boolean
  isPrivate: boolean
}

export type TLastPosts = Array<{
  postUrl: string
  image: string
  video: null | {
    url: string
    views: number | null
  }
  content: string | null
  likes: number
  qtyComments: number
}>

export type TPost = {
  postUrl: string
  image: {
    standard: string
    hd: string
  }
  video: TVideo | null
  content: string | null
  likes: number
  qtyComments: number
  gallery: Array<TMedia>
  author: TAuthor
  coauthors: Array<TAuthor>
  previewComments: Array<TComment>
  location: null | {
    country: string | null
    region: string | null
    city: string | null
    street: string | null
    coordinates: {
      lat: number
      lng: number
    }
  }
  date: string
}

export type TVideo = {
  url: TQualities
  type: 'feed' | 'clips' | 'carousel_container'
  duration: number
  views?: number | null
  audio?: {
    artist: string
    song: string | null
  } | null
}

export type TMedia = {
  image: TQualities
  video: TVideo | null
  taggedUsers: Array<TTagged>
}

export type TQualities = {
  standard: string
  hd: string
}

export type TTagged = {
  image: string
  name: string
  isVerified: boolean
  position: Array<number>
}

export type TComment = {
  content: string
  author: TAuthor
  likes: number
  isSpam: boolean
  date: string
}

export type TAuthor = {
  username: string
  name: string
  image: string
  isVerified: boolean
  isPrivate: boolean
}
