import { FormElement } from "@nextui-org/react"
import { useState } from "react"

interface Props<T> {
    initValues: T,
    onSubmit: () => void
}


export const useSimpleForm = <T>({ initValues, onSubmit }: Props<T>) => {

    const [form, setForm] = useState<T>(initValues)

    const handleChange = ({ target }: React.ChangeEvent<FormElement>) => setForm(prev => ({ ...prev, [target.name]: target.value }))

    const handleSubmit = () => {
        onSubmit();
    }

    return {
        handleChange, handleSubmit,
        form
    }
}