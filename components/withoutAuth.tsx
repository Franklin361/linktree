
import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'
import { NextPage } from 'next';
import { LoadingFullScreen } from './ui';
import { useInitUser } from '../hooks';


export default function withoutAuth(Component: NextPage) {
    return function AuthProtected(props: {}) {
        const router = useRouter()
        const { isLoading, isAuthenticated } = useAuthenticationStatus()

        const { user } = useInitUser(isLoading)

        if (isLoading) return <LoadingFullScreen />

        if (isAuthenticated && !user?.metadata.deleteAccount) {
            router.replace('/')
            return null
        }

        return <Component {...props} />
    }
}