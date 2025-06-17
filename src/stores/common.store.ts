import { createStore } from 'zustand/vanilla'

export type User = {
  name: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
}

export type UserState = {
  user: User
}

export type UserActions = {
  setUser: () => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  user: {
    name: 'Micheal A.',
    avatar: '/images/dummy-avatar.png',
  },
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: () => set((state) => ({ ...state })),
  }))
}