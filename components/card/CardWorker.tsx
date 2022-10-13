import { useMutation } from '@apollo/client';
import { Button, Loading, Row } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { APPLY_JOB } from "../../graphql";
import { useAppDispatch } from "../../hooks";
import { JobState } from '../../interfaces';
import { addJob } from '../../redux';
import { CardLayout } from '../layouts';
import { memo } from 'react';


export const CardWorker = memo((job: JobState) => {

    const dispatch = useAppDispatch()

    const [mutationAction, { loading }] = useMutation<{ insert_post_user_one: { post: JobState[] } }>(APPLY_JOB)

    const handleApplyToJob = async () => {
        try {

            const { id } = job
            await mutationAction({ variables: { id } })

            dispatch(addJob({ job, input: 'appliedJobs' }))
            toast.success(`Apply to "${job.title}" successfully!`, { id: '1' })
        } catch (error) {

            const err = error as Error
            if (err.message.includes('duplicate key value')) return toast.success('You already apply for this job', { icon: '⚠️' })
            toast.error((error as Error).message)
        }
    }

    return (
        <CardLayout job={job}>
            <Button size='lg' auto flat onPress={handleApplyToJob}>
                {
                    loading
                        ? <Row css={{ alignItems: 'center', gap: '1em' }}>
                            <Loading size='sm' /> Applying for this job...
                        </Row>
                        : 'Apply to this job'
                }
            </Button>
        </CardLayout>
    )
})

CardWorker.displayName = 'CardWorker'