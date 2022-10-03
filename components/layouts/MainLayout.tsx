import { PropsLayout } from "../../interfaces"
import { Container } from '@nextui-org/react';
import { CustomNavbar } from "../ui";
import Head from 'next/head';


export const MainLayout = ({ children, title }: PropsLayout) => {

    return (
        <>
            <CustomNavbar />
            <Container md css={{ padding: '1em' }}>
                <Head> <title>{title}</title> </Head>
                {children}
            </Container>
        </>
    )
}
