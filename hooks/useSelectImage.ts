import { useMutation } from '@apollo/client';
import { useNhostClient } from '@nhost/react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { UPDATE_USER_AVATAR } from '../graphql';
import { loadingUserState, setUserAvatar } from '../redux';
import { useAppDispatch } from './useStore';

export const useSelectImage = (initImage: string) => {

    const fileRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const nhost = useNhostClient()

    const handleOpenFiles = () => fileRef.current?.click()

    const [image, setImage] = useState(initImage)

    const [mutateUser] = useMutation(UPDATE_USER_AVATAR)

    const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        const preview = URL.createObjectURL(file)
        setImage(preview)

        try {

            dispatch(loadingUserState(true))

            const [dataUpload] = await Promise.all([
                nhost.storage.upload({ file }),
                nhost.storage.delete({ fileId: image.split('/').reverse()[0] }),
            ])

            const { error, fileMetadata } = dataUpload

            if (error && !fileMetadata) return;

            //* Note: add role "public" to table storage.file in Hashura to use publicUrl
            const url = nhost.storage.getPublicUrl({ fileId: fileMetadata.id })
            setImage(url)

            await mutateUser({
                variables: {
                    id: nhost.auth.getUser()?.id,
                    avatarUrl: url,
                    metadata: {
                        ...nhost.auth.getUser()?.metadata
                    }
                }
            })

            dispatch(setUserAvatar(url))

            toast.success('Updated image profile successfully!', { id: '0', })
        } catch (error) {
            toast.success(error as string, { id: '0', })
        } finally { dispatch(loadingUserState(false)) }
    }

    return {
        fileRef,
        image,
        onChangeImage,
        handleOpenFiles
    }
}