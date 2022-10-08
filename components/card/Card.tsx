import { Row, Card, User, Text, Button, Loading } from '@nextui-org/react';
import { JobState } from '../../interfaces';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../graphql';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../hooks';
import { removeJob } from '../../redux';

interface Props extends JobState {
    isOwn?: boolean
}

export const CardJob = ({ createdAt, desc, id, title, user, isOwn = false }: Props) => {


    const [mutationDelete, { loading }] = useMutation(DELETE_POST)
    const dispatch = useAppDispatch()
    const handleDelete = async () => {
        try {

            await mutationDelete({ variables: { id } })
            dispatch(removeJob(id))
            toast.success('Post deleted successfully!')

        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (

        <Row justify='center'>
            <Card variant='bordered'>
                {
                    !isOwn && <>
                        <Card.Header>
                            <User
                                src={user.avatarUrl}
                                name={user.displayName}
                                description="UI/UX Designer @Github"
                                bordered
                                color='primary'
                                size="lg"
                            />
                        </Card.Header>
                        <Card.Divider />
                    </>
                }
                <Card.Body css={{ '@xsMin': { pb: '0', mw: '500px' } }}>
                    <Text size='$xl' color='primary' css={{ mb: '.5em' }} b>{title}</Text>
                    <Text span>{desc}</Text>
                    <Row justify='flex-start' css={{ mt: '.5em' }}>
                        <Text b size='$sm' color='rgba(255, 255, 255, .5)'>
                            {Intl.DateTimeFormat('en').format(new Date(createdAt))}
                        </Text>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row justify='flex-end' css={{ '@xsMax': { justifyContent: 'center' } }}>
                        {
                            isOwn
                                ? <Button size='lg' color='error' flat onPress={handleDelete}>
                                    {loading ? <Row css={{ alignItems: 'center', gap: '1em' }}><Loading size='sm' color='error' /> Deleting job...</Row> : 'Delete Job'}
                                </Button>
                                : <Button size='lg' auto flat >Apply to this job</Button>
                        }
                    </Row>
                </Card.Footer>
            </Card>
        </Row>
    )
}