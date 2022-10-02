import { Input, FormElement } from '@nextui-org/react';
interface Props {
    name: string
    disable: boolean
    label: string
    onChange: (e: React.ChangeEvent<FormElement>) => void
    value: string
    type?: 'password' | 'email' | 'text'
    mt?: boolean
}

export const CustomInput = ({ disable, name, onChange, value, mt = false, type = 'text', label }: Props) => {
    return (
        <Input
            name={name}
            clearable={disable}
            disabled={disable}
            bordered
            labelPlaceholder={label}
            size="xl"
            color='secondary'
            width="100%"
            type={type}
            css={{ mt: mt ? '1em' : '0' }}
            onChange={onChange}
            value={value}
        />
    )
}