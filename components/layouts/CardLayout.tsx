import { Element, JobState } from "../../interfaces"
import { Row, Card, Text, User } from '@nextui-org/react';

interface ICardLayout {
    children: Element,
    job: JobState,
    isOwn?: boolean
}

export const CardLayout = ({ children, job, isOwn = false }: ICardLayout) => {
    return (

        <Row justify='center' >
            <Card variant='bordered'>
                {
                    !isOwn && <>
                        <Card.Header>
                            <User
                                src={job.user.avatarUrl}
                                name={job.user.displayName}
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
                    <Text size='$xl' color='primary' css={{ mb: '.5em' }} b>{job.title}</Text>
                    <Text span>{job.desc}</Text>
                    <Row justify='flex-start' css={{ mt: '.5em' }}>
                        <Text b size='$sm' color='rgba(255, 255, 255, .5)'>
                            {Intl.DateTimeFormat('en').format(new Date(job.createdAt))}
                        </Text>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row justify='flex-end' css={{ gap: '1em', '@xsMax': { justifyContent: 'center', flexDirection: 'column', alignItems: 'center' } }}>
                        {children}
                    </Row>
                </Card.Footer>
            </Card>
        </Row>
    )
}