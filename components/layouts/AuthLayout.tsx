import Head from 'next/head';
import { Card, Container, Row, Text } from '@nextui-org/react';

import { PropsLayout } from '../../interfaces';

export const AuthLayout = ({ children, title }: PropsLayout) => {
    return (
        <Container sm css={{ padding: '1em' }}>
            <Head> <title>{title}</title> </Head>
            <Row>
                <Text h1
                    size={60}
                    color='secondary'
                    weight="bold"
                    css={{
                        textAlign: 'center',
                        margin: 'auto',
                        width: '100%',
                        textGradient: "45deg, $blue600 -20%, $pink600 50%"
                    }}
                >{title}</Text>
            </Row>

            <Card css={{ my: '3em', display: 'flex', flexDirection: 'column', w: '400px', mx: 'auto', borderRadius: '8px', gap: '2em', justifyContent: 'center', alignItems: 'center', padding: '4em 2em 2em 2em', '@xsMax': { w: '90%' } }} >
                {children}
            </Card>
        </Container >
    )
}