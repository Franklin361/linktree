import { Row, Loading } from '@nextui-org/react';

export const LoadingFullScreen = () => {
    return (

        <Row css={{ display: 'flex', textAlign: 'center', outline: 'auto', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', w: '100vw', h: '100vh', gap: '3em' }}>
            <Loading size='xl' color='secondary' css={{ gap: '$10', fontWeight: 'bold' }}>Loading</Loading>
        </Row>
    )
}