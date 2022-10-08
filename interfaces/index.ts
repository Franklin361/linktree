import userSlice from '../redux/user/userSlice';


export interface PropsLayout {
    children: Element
    title: string
}

export type Element = JSX.Element | JSX.Element[]

export interface User {
    id: string
    email: string
    avatarUrl: string
    phone: string
    displayName: string
    web: string
    about: string
    rol: string
}


export interface JobState {
    id: number
    title: string
    desc: string
    createdAt: string
    user: Pick<User, 'avatarUrl' | 'id' | 'displayName'>
}










