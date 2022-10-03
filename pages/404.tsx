import { useRouter } from "next/router"
import { useAuthenticationStatus } from '@nhost/nextjs';
import { LoadingFullScreen } from "../components";

export default function Custom404() {

    const { isLoading, isAuthenticated } = useAuthenticationStatus()
    const { replace } = useRouter()

    if (isLoading) return <LoadingFullScreen />

    if (!isAuthenticated) {
        replace('/auth/login')
        return null
    }

    if (isAuthenticated) {
        replace('/')
        return null
    }

}