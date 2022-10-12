import { Button, Input, Loading, Text } from "@nextui-org/react"
import Link from "next/link";
import { NextPage } from "next"
import { useRouter } from 'next/router'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { AuthLayout, CustomInput, Footer } from "../../components";
import { useSimpleForm } from "../../hooks";
import withoutAuth from "../../components/withoutAuth";

const initValues = {
    email: 'frankomtzlucas361@gmail.com',
    password: '12345678',
    name: 'Frank'
}

const RegisterPage: NextPage = () => {

    const { signUpEmailPassword, isLoading, needsEmailVerification, isError, error } = useSignUpEmailPassword()
    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues,
        onSubmit: async () => {
            const { email, name, password } = form

            await signUpEmailPassword(email, password, {
                displayName: name,
                metadata: {
                    name,
                    rol: 'worker',
                    deleteAccount: false
                }
            })
        }
    })

    const disableForm = isLoading || needsEmailVerification

    return (
        <AuthLayout title="LinkTree - Register">

            <CustomInput
                disable={disableForm}
                name="name"
                label="Full name"
                onChange={handleChange}
                value={form.name}
            />

            <CustomInput
                disable={disableForm}
                name="email"
                type='email'
                label="E-mail"
                onChange={handleChange}
                value={form.email} mt
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
                link='/auth/login'
                labelButton='Sign Up'
                labelLink="Do you have already an account?"
                {...{ isLoading, isError, needsEmailVerification }}
            />
        </AuthLayout>
    )
}
export default withoutAuth(RegisterPage)