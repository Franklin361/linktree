import { Row, Spacer, Col, Switch, Text, Loading } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { startEdit } from '../redux';
import { useEffect } from 'react';

interface Props {
}

export const SwitchProfile = ({ }: Props) => {

    const { loadingUser, isEdit } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const handleChangeEdit = () => dispatch(startEdit(!isEdit))

    useEffect(() => {
        return () => { dispatch(startEdit(false)) }
    }, [])


    return (
        <Row
            css={{ borderBottom: '1px solid $text', py: '1em', mb: '1em', position: 'sticky', top: '76px', zIndex: '$max', bg: '$background', d: 'flex' }}
            className='sticky'
        >
            {
                loadingUser && <Col css={{ d: 'flex', gap: '1em' }}><Loading type="default" size="md" textColor='primary' /> <Text color='primary'>saving</Text></Col>
            }

            <Spacer css={{ flex: '1' }} />

            <Col css={{ alignItems: 'center', d: 'flex', gap: '1em', justifyContent: 'flex-end' }}>
                <Text b>Edit Info</Text>
                <Switch shadow color="primary" checked={isEdit} onChange={handleChangeEdit} />
            </Col>
        </Row>
    )
}