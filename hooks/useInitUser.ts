import { useUserData } from '@nhost/nextjs';
import { useAppDispatch, useAppSelector } from './useStore';
import { useEffect } from 'react';
import { setUser } from '../redux';
import { User } from '../interfaces';


export const useInitUser = (checkingAuth: boolean) => {
    const userData = useUserData()
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user && userData && userData?.email) {

            const { avatarUrl, displayName, id, metadata, email } = userData
            const { about = '', phone = '', rol = '', web = '' } = metadata as unknown as User
            dispatch(setUser({ about, avatarUrl, id, displayName, phone, rol, web, email }))
        }
    }, [checkingAuth])
}