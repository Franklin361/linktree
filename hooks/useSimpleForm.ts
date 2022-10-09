import { FormElement } from "@nextui-org/react"
import { useState } from "react"

interface Props<T> {
    initValues: T,
    onSubmit: () => void,
    isResetForm?: boolean
}


export const useSimpleForm = <T>({ initValues, onSubmit, isResetForm = false }: Props<T>) => {

    const [form, setForm] = useState<T>(initValues)

    const handleChange = (e: React.ChangeEvent<FormElement> | string) => {
        const name = typeof e === 'string' ? 'rol' : e.target.name;
        const value = typeof e === 'string' ? e : e.target.value;

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        onSubmit();
        isResetForm && setForm(initValues)
    }

    return {
        handleChange, handleSubmit,
        form
    }
}