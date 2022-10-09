import { Card, Text } from '@nextui-org/react';

export const CustomAlert = ({ msg }: { msg: string }) => {
    return (
        <Card css={{ w: 'fit-content', m: 'auto', px: '1em', bg: '$error' }}>
            <Card.Body>
                <Text b size='$lg'>Ups!, it was an error, please refresh the window</Text>
                <Text size='$md'>{msg}</Text>
            </Card.Body>
        </Card>
    )
}