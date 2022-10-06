
import { useAuthenticationStatus } from '@nhost/nextjs';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useInitUser } from '../hooks';
import { LoadingFullScreen } from './ui';



export default function withAuth(Component: NextPage) {
    return function AuthProtected(props: {}) {

        const router = useRouter()

        const { isLoading, isAuthenticated } = useAuthenticationStatus()

        const { user } = useInitUser(isLoading)

        if (isLoading) return <LoadingFullScreen />

        if (!isAuthenticated || user?.metadata.deleteAccount) {
            router.replace('/auth/login')
            return null
        }

        return <Component {...props} />
    }
}


