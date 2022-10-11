import { Button, Loading, Text, Grid } from '@nextui-org/react';
import { ModalLayout } from "../layouts"
import { useMutation } from '@apollo/client';
import { DISABLED_USER } from "../../graphql";
import { useUserId, useSignOut } from '@nhost/react';
import toast from 'react-hot-toast';
import { useAppDispatch } from "../../hooks";
import { openModal, setUser } from "../../redux";
import { useUserData } from '@nhost/nextjs';

export const ModalDeleteUser = () => {
    const user = useUserData()
    const { signOut } = useSignOut()

    const [disabledUser, { loading }] = useMutation(DISABLED_USER)
    const dispatch = useAppDispatch()

    const handleDelete = async () => {
        try {
            await disabledUser({
                variables: {
                    id: user?.id,
                    metadata: {
                        ...user?.metadata,
                        deleteAccount: true
                    }
                }
            })
            signOut()
            dispatch(setUser(null))
            toast.success('Your account was disabled!')
        } catch (error) {
            console.log(error)
            toast.error('Account was not deleted, try later!')
        } finally { dispatch(openModal({ open: false })) }
    }

    return (
        <ModalLayout
            title="Delete account"
            desc="Are you sure you want to disable your account? 🤔"
        >
            <Button ghost={!loading} bordered={loading} color='gradient' onPress={handleDelete} auto size='lg'>
                {
                    loading
                        ? <Grid css={{ alignItems: 'center', d: 'flex' }}><Loading size="sm" /> <Text span color='primary' css={{ ml: '.5em' }}> disabling...</Text></Grid>
                        : 'Yes, disable it'
                }
            </Button>
        </ModalLayout>
    )
}