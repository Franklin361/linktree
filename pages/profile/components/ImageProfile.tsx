import { useRef, useState } from 'react';
import { Row, Button, Text, Spacer, Image } from '@nextui-org/react';
import { useUserData } from '@nhost/react';
import { useSelectImage } from '../../../hooks';

interface TImageProfile {
    isEdit: boolean
}

export const ImageProfile = ({ isEdit }: TImageProfile) => {
    const user = useUserData()
    const { fileRef, image, ...fn } = useSelectImage(user?.avatarUrl || '')

    return (
        <Row css={{ alignItems: 'center', '@xsMax': { flexDirection: 'column' } }} justify='flex-end'>

            <input
                onChange={fn.onChangeImage}
                type="file"
                ref={fileRef}
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
            />

            {
                isEdit
                    ? <Button ghost onPress={fn.handleOpenFiles}>Change image</Button>
                    : <Text size='$lg' b>Profile image:</Text>
            }

            <Spacer css={{ flex: '1' }} />

            <Image
                showSkeleton
                maxDelay={10000}
                src={image}
                css={{ w: '100px', h: '100px', borderRadius: '100%', objectFit: 'cover' }}
                alt="Default Image"
            />

        </Row>
    )
}