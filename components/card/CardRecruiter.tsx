import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from "../../graphql";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openModal, removeJob, selectPostId } from '../../redux';
import { JobState } from '../../interfaces';
import { CardLayout } from '../layouts';
import { Button, Row, Loading } from '@nextui-org/react';
import { ModalUsersApplied } from '../modals';
import { memo, useState } from 'react';


export const CardRecruiter = memo((job: JobState) => {

    const dispatch = useAppDispatch()
    const [mutationDelete, { loading }] = useMutation(DELETE_POST)

    const handleDelete = async () => {
        try {
            const { id } = job
            await mutationDelete({ variables: { id } })
            dispatch(removeJob({ id }))
            toast.success('Post deleted successfully!')

        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const handleOpenModal = () => {
        dispatch(selectPostId(job.id))
        dispatch(openModal({ open: true, modal: 'users-applied' }))
    }

    return (
        <CardLayout job={job} isOwn >

            <Button size='lg' color='error' flat onPress={handleDelete}>
                {
                    loading
                        ? <Row css={{ alignItems: 'center', gap: '1em' }}>
                            <Loading size='sm' color='error' /> Deleting job...
                        </Row>
                        : 'Delete Job'
                }
            </Button>
            <Button onClick={handleOpenModal} size='lg' flat color="warning"> View Applies </Button>
        </CardLayout>
    )
})