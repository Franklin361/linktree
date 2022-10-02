import { useRouter } from "next/router"
import { useEffect } from "react"

// TODO: verify user auth, then go back to login or home

// pages/404.tsx
export default function Custom404() {

    const { replace } = useRouter()

    useEffect(() => {
        replace('/auth/login')
    }, [])


    return null
}