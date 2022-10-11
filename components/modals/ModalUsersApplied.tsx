import { Button, Collapse, Grid, Row, Text, Avatar, Link, Spacer } from '@nextui-org/react';
import { useAppSelector } from '../../hooks';
import { ModalLayout } from '../layouts/ModalLayout';
import { useQuery } from '@apollo/client';
import { GET_PEOPlE_TO_APPLIED } from '../../graphql';
import { CustomLoading } from '../ui';

interface User {
    displayName: string
    email: string
    metadata: any
    avatarUrl: string
    id: string
}

interface B {
    userpost: User[]
}

interface IData {
    post_user: B[]
}

function getRandomInt() {
    const n = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    switch (n) {
        case 1: return "primary"
        case 2: return "secondary"
        case 3: return "error"
        case 4: return "warning"
        case 5: return "success"
        default: return "primary"
    }
}

export const ModalUsersApplied = () => {

    const { postId } = useAppSelector(state => state.job)
    const { data, loading, error } = useQuery<IData>(GET_PEOPlE_TO_APPLIED, { variables: { id: postId } })

    if (loading || !data) return <ModalLayout fullScreen title='Users Applied' scroll buttonSubmit={<></>}><CustomLoading msg='Loading users' /></ModalLayout>

    return (
        <ModalLayout fullScreen title='Users Applied' scroll buttonSubmit={<></>}>
            <Collapse.Group >
                {
                    data.post_user.length === 0
                        ? <Text css={{ ta: 'center', m: 'auto', w: 'fit-content', d: 'block' }} color='warning' span size='$xl'>No users applied for this job</Text>
                        : data.post_user.map(({ userpost }) => (
                            <CollapseItem key={userpost[0].id} {...userpost[0]} />
                        ))
                }
            </Collapse.Group>
        </ModalLayout>
    )
}


export const CollapseItem = ({ avatarUrl, displayName, email, metadata }: User) => {
    const { about = 'No description', phone = 'Not Provided', web = 'No portfolio' } = metadata

    return (
        <Collapse
            title={<Text h4>{displayName}</Text>}
            borderWeight='normal'
            css={{ borderColor: `$accents5` }}
            contentLeft={
                <Avatar
                    size="lg"
                    src={avatarUrl}
                    color={getRandomInt()}
                    bordered
                    squared
                />
            }
        >
            <Row css={{ d: 'flex', justifyContent: 'space-between', '@xsMax': { flexDirection: 'column' } }}>
                <Text size='$xl' span> Email: <Text b color='secondary' size='$2xl'>{email}</Text></Text>
                <Text size='$xl' span> Phone: <Text b color={`${phone ? 'secondary' : '$accents5'}`} size='$2xl'>{phone ? phone : 'Not Provided'}</Text></Text>
            </Row>
            <Spacer y={.5} />
            <Row>
                <Text size='$lg'>{about}</Text>
            </Row>
            <Spacer />

            <Row css={{ d: 'flex', justifyContent: 'flex-end', '@xsMax': { flexDirection: 'column' } }}>
                <Button flat as='a' href={web} disabled={!!!web} target='_blank'>
                    {web ? 'View Portfolio' : 'No Portfolio'}
                </Button>
            </Row>

        </Collapse>
    )
}