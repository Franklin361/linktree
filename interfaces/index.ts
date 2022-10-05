

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
