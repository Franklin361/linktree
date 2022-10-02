import { NextPage } from "next"
import { useRouter } from 'next/router';
import { useSignInEmailPassword } from '@nhost/nextjs'

import { AuthLayout } from "../../components";
import { CustomInput, Footer } from './components';

import { useSimpleForm } from "../../hooks";
import withoutAuth from '../../components/withoutAuth';

const initValues = {
    email: 'frankomtzlucas361@gmail.com',
    password: '12345678',
}

const LoginPage: NextPage = () => {

    const { signInEmailPassword, isLoading, needsEmailVerification, isError, error } = useSignInEmailPassword()

    const router = useRouter()
    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues,
        onSubmit: async () => {
            const { email, password } = form
            const { isSuccess, accessToken, needsEmailVerification } = await signInEmailPassword(email, password)
            // TODO: store token in some cookie
            if (isSuccess && !needsEmailVerification) return router.replace('/')
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