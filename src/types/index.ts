export interface Profile {
  id: string
  email: string
  role: 'admin' | 'student'
}

export interface Category {
  id: string
  title: string
  color: string
  order_idx: number
}

export interface AppLink {
  id: string
  category_id: string
  title: string
  url: string
  icon_url: string
  description: string
  order_idx: number
}

export interface Settings {
  id: number
  background_url: string
}
