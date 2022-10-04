import { Row, Spacer, Col, Switch, Text, Loading } from '@nextui-org/react';

interface Props {
    handleChangeEdit: () => void
    isLoading: boolean
}

export const SwitchProfile = ({ handleChangeEdit, isLoading }: Props) => {
    return (
        <Row css={{ borderBottom: '1px solid $text', py: '1em', mb: '1em', position: 'sticky', top: '76px', zIndex: '$max', bg: '$background', d: 'flex' }} className='sticky'>
            {
                isLoading && <Col css={{ d: 'flex', gap: '1em' }}><Loading type="default" size="md" textColor='primary' /> <Text color='primary'>saving</Text></Col>
            }

            <Spacer css={{ flex: '1' }} />

            <Col css={{ alignItems: 'center', d: 'flex', gap: '1em', justifyContent: 'flex-end' }}>
                <Text b>Edit Info</Text>
                <Switch shadow color="primary" checked={false} onChange={handleChangeEdit} />
            </Col>
        </Row>
    )
}