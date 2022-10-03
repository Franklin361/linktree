
import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'
import { NextPage } from 'next';
import { LoadingFullScreen } from './ui';


export default function withAuth(Component: NextPage) {
    return function AuthProtected(props: {}) {

        const router = useRouter()

        const { isLoading, isAuthenticated } = useAuthenticationStatus()

        if (isLoading) return <LoadingFullScreen />

        if (!isAuthenticated) {
            router.replace('/auth/login')
            return null
        }

        return <Component {...props} />
    }
}


