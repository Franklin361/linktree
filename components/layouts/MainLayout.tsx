import { Container } from '@nextui-org/react';
import Head from 'next/head';
import { PropsLayout } from "../../interfaces";
import { CustomNavbar } from "../ui";


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
