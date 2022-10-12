import { NextPage } from "next"
import { useRouter } from 'next/router';
import { useSignInEmailPassword } from '@nhost/nextjs'

import { AuthLayout, CustomInput, Footer } from "../../components";

import { useAppDispatch, useSimpleForm } from "../../hooks";
import withoutAuth from '../../components/withoutAuth';
import { User } from "../../interfaces";
import { setUser } from "../../redux";
import toast from 'react-hot-toast';
import { useSignOut } from '@nhost/react';

const initValues = {
    email: 'frankomtzlucas361@gmail.com',
    password: '12345678',
}

const LoginPage: NextPage = () => {

    const dispatch = useAppDispatch();
    const { signOut } = useSignOut()

    const { signInEmailPassword, isLoading, needsEmailVerification, isError, error } = useSignInEmailPassword()

    const router = useRouter()
    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues,
        onSubmit: async () => {
            const { email, password } = form
            const { isSuccess, needsEmailVerification, user } = await signInEmailPassword(email, password)

            if (isSuccess && !needsEmailVerification && user && user?.email) {

                const { avatarUrl, displayName, id, metadata, email } = user

                if (metadata.deleteAccount) {
                    signOut()
                    dispatch(setUser(null))
                    toast.error('Your account was disabled, contact us to enable it if you need it!')
                    return
                }

                const { about = '', phone = '', rol = '', web = '' } = metadata as unknown as User

                dispatch(setUser({ about, avatarUrl, id, displayName, phone, rol, web, email }))

                router.replace('/')
            }
        }
    })

    const disableForm = isLoading || needsEmailVerification

    return (
        <AuthLayout title="LinkTree - Sign In">

            <CustomInput
                disable={disableForm}
                name="email"
                type='email'
                label="E-mail"
                onChange={handleChange}
                value={form.email}
            />

            <CustomInput
                disable={disableForm}
                label='Password'
                name="password"
                type='password'
                onChange={handleChange}
                value={form.password}
                mt
            />

            <Footer
                disabled={disableForm}
                onSubmit={handleSubmit}
                error={error?.message}
                link='/auth/register'
                labelLink="Don't you have an account?"
                labelButton='Sign In'
                {...{ isLoading, isError, needsEmailVerification }}
            />

        </AuthLayout>
    )
}
export default withoutAuth(LoginPage)