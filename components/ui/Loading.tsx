import { Row, Loading, Text } from '@nextui-org/react';

export const LoadingFullScreen = () => {
    return (

        <Row css={{ display: 'flex', textAlign: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', w: '100vw', h: '100vh', gap: '3em' }}>
            <Loading size='xl' color='secondary' css={{ gap: '$10', fontWeight: 'bold' }}>Loading</Loading>
        </Row>
    )
}


interface ICustomLoading {
    msg: string
}
export const CustomLoading = ({ msg }: ICustomLoading) => {
    return (
        <Row css={{ my: '2em', flexDirection: 'column', gap: '1em', justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
            <Text>{msg}</Text>
        </Row>
    )
}