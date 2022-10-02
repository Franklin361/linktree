import { Button, Loading, Text, Link } from '@nextui-org/react';

interface Props {
    onSubmit: () => void
    disabled: boolean
    isLoading: boolean
    isError: boolean
    error: string | undefined
    needsEmailVerification: boolean
    link: string
    labelLink: string
    labelButton: string
}

export const Footer = ({ disabled, error, isError, isLoading, onSubmit, labelLink, link,
    needsEmailVerification, labelButton }: Props) => {
    return (
        <>
            <Button size='lg' color='gradient' shadow onPress={onSubmit} disabled={disabled}>{labelButton}</Button>

            {isLoading && <Loading color='currentColor' size="md" />}

            {needsEmailVerification && <Text css={{ textAlign: 'center' }} color="warning" b>Please check your mailbox and follow the verification link to verify your email.</Text>}

            {(isError) && <Text css={{ textAlign: 'center' }} color="error" b>
                {error}.
            </Text>}


            <Link href={link}> {labelLink} </Link>
        </>
    )
}