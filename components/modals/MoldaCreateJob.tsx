import { useMutation } from '@apollo/client';
import { Button, Input, Loading, Textarea, Row } from '@nextui-org/react';
import { CREATE_JOB } from '../../graphql';
import { useAppDispatch, useSimpleForm } from '../../hooks';
import { JobState } from '../../interfaces';
import { addJob, openModal } from '../../redux';
import { ModalLayout } from "../layouts";
import toast from 'react-hot-toast';

export const ModalCreateJob = () => {

    const dispatch = useAppDispatch()

    const [createMutation, { loading }] = useMutation<{ insert_post_one: JobState }>(CREATE_JOB)

    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues: {
            title: 'test1',
            desc: 'test1desc'
        },
        onSubmit: async () => {
            try {
                const { data } = await createMutation({ variables: { ...form } })

                toast.success('Job created successfully!')
                dispatch(addJob(data!.insert_post_one))
            } catch (error) {
                toast.error((error as Error).message)
            } finally { dispatch(openModal(false)) }
        }
    })

    return (
        <ModalLayout
            disabled={loading}
            // scroll
            title="Create a new Job"
            buttonSubmit={
                <Button disabled={loading} color='primary' onPress={handleSubmit} auto size='lg'>
                    {
                        loading
                            ? <Row css={{ alignItems: 'center', gap: '1em' }} ><Loading color='white' /> Creating job...</Row>
                            : 'Create job'
                    }
                </Button>
            }
        >
            <Input
                disabled={loading}
                name='title'
                label="Job's Title"
                bordered
                color='primary'
                size='xl'
                value={form.title}
                onChange={handleChange}
            />

            <Textarea
                disabled={loading}
                name='desc'
                value={form.desc}
                onChange={handleChange}
                size='xl'
                bordered
                color='primary'
                width='100%'
                label="Write description for job"
                placeholder="We are..."
                rows={5}
                maxRows={5}
            />
        </ModalLayout>
    )
}