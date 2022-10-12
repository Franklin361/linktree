import { Button, Image, Row, Spacer, Text } from '@nextui-org/react';
import { useUserData } from '@nhost/react';
import { useAppSelector, useSelectImage } from '../hooks';

interface TImageProfile {

}

export const ImageProfile = ({ }: TImageProfile) => {
    const userData = useUserData()
    const { isEdit, user, loadingUser } = useAppSelector(state => state.user)
    const { fileRef, image, ...fn } = useSelectImage(user ? user.avatarUrl : userData?.avatarUrl!)

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
                    ? <Button disabled={loadingUser} ghost onPress={fn.handleOpenFiles}>Change image</Button>
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