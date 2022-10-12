import { JobState } from "../../interfaces"
import { Button, Card, User, Text, Row, Loading } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useAppDispatch } from "../../hooks";
import { useMutation } from '@apollo/client';
import { DE_APPLY_JOB } from "../../graphql";
import { removeJob } from "../../redux";
import { useUserId } from '@nhost/react';
import { memo } from 'react';

export const CardAppliedForJob = memo((job: JobState) => {
    // TODO: button submit can be reused in some other components
    const dispatch = useAppDispatch()
    const user_id = useUserId()
    const [mutationAction, { loading }] = useMutation(DE_APPLY_JOB)

    const handleDeApply = async () => {
        try {
            const { id } = job
            await mutationAction({ variables: { post_id: id, user_id } })
            dispatch(removeJob({ input: 'appliedJobs', id }))
            toast.success('De-apply for this job')
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <Card>
            <Card.Header css={{ d: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2em' }}>
                <User
                    src={job.user.avatarUrl}
                    name={job.user.displayName}
                    description="UI/UX Designer @Github"
                    bordered
                    color='primary'
                    size="lg"
                />

                <Button disabled={loading} color='error' onPress={handleDeApply} auto ghost>
                    {
                        loading
                            ? <Row css={{ alignItems: 'center', gap: '1em' }}>
                                <Loading size='sm' /> Dis-applying...
                            </Row>
                            : 'Dis-apply'
                    }
                </Button>
            </Card.Header>
            <Card.Body css={{ pt: '0', px: '2em' }}>
                <Text color='secondary' b>{job.title}</Text>
                <Text>{job.desc}</Text>
            </Card.Body>
        </Card>
    )
})