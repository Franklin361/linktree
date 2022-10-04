import { useState, useRef } from 'react';

export const useSelectImage = (initImage: string) => {

    const fileRef = useRef<HTMLInputElement>(null);

    const handleOpenFiles = () => fileRef.current?.click()

    const [image, setImage] = useState(initImage)

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const preview = URL.createObjectURL(e.target.files[0])
        setImage(preview)
    }

    return {
        fileRef,
        image,
        onChangeImage,
        handleOpenFiles
    }
}