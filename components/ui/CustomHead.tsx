import Head from 'next/head';

interface Props {
    title?: string
}

export const CustomHead = ({ title = 'LinkTree' }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
        </>
    )
}
