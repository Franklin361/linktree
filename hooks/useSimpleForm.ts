import { FormElement } from "@nextui-org/react"
import { useState } from "react"

interface Props<T> {
    initValues: T,
    onSubmit: () => void
}


export const useSimpleForm = <T>({ initValues, onSubmit }: Props<T>) => {

    const [form, setForm] = useState<T>(initValues)

    const handleChange = (e: React.ChangeEvent<FormElement> | string) => {
        const name = typeof e === 'string' ? 'rol' : e.target.name;
        const value = typeof e === 'string' ? e : e.target.value;

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        onSubmit();
    }

    return {
        handleChange, handleSubmit,
        form
    }
}