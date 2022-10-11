import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from "../../graphql";
import { useAppDispatch } from "../../hooks";
import { removeJob } from '../../redux';
import { JobState } from '../../interfaces';
import { CardLayout } from '../layouts';
import { Button, Row, Loading } from '@nextui-org/react';


export const CardRecruiter = (job: JobState) => {

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
        </CardLayout>
    )
}