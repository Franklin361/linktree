import { useMutation } from '@apollo/client';
import { Spacer, Radio, Text, Row, Input, Col, Button, Textarea } from '@nextui-org/react';
import { useUserData } from '@nhost/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { UPDATE_USER } from '../../../graphql';
import { useSimpleForm } from '../../../hooks';

interface Props {
    isEdit: boolean,
    handleLogin: (loading: boolean) => void
}

export const FormProfile = ({ isEdit, handleLogin }: Props) => {

    const user = useUserData()

    const [mutateUser, { loading }] = useMutation(UPDATE_USER)

    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues: {
            name: user?.displayName || '',
            phone: user?.metadata?.phone as string || '',
            web: user?.metadata?.web as string || '',
            about: user?.metadata?.about as string || '',
            rol: user?.metadata?.rol as string || ''

        },
        onSubmit: async () => {
            const { about, name, phone, rol, web } = form
            try {
                await mutateUser({
                    variables: {
                        id: user!.id,
                        displayName: name,
                        metadata: {
                            about,
                            web,
                            phone,
                            rol
                        }
                    }
                })
                toast.success('Updated successfully!', { id: 'only', })
            } catch (error) {
                toast.success(error as string, { id: 'only', })
            }
        }
    })

    useEffect(() => { handleLogin(loading) }, [loading])


    if (!user) return null

    const { createdAt, email, emailVerified } = user

    const isDisable = loading || !isEdit

    return (

        <Row css={{ d: 'flex', flexDirection: 'column' }}>
            <Spacer y={1} />
            <Text size='$lg' >Account created at: <Text b color='primary'>{createdAt}</Text></Text>

            <Text size='$lg'>E-mail: <Text b color='primary' css={{ wordBreak: 'break-word' }}>{email}</Text></Text>
            {
                emailVerified ? <Text b size='$sm' color='success'>E-mail verified!</Text> : <Text b size='$sm' color='warning'>E-mail not verified</Text>
            }
            <Spacer y={1} />

            <Input name='name' onChange={handleChange} disabled={isDisable} size='lg' width='100%' label="Full Name" value={form.name} />
            <Spacer y={.5} />

            <Input name='phone' onChange={handleChange} disabled={isDisable} size='lg' width='100%' label="Phone number" value={form.phone} type='tel' placeholder='+00 00 0000 0000' />
            <Spacer y={.5} />

            <Input name='web' onChange={handleChange} disabled={isDisable} size='lg' width='100%' label="Portfolio web" value={form.web} type='text' placeholder='www.website.com' />
            <Spacer y={.5} />

            <Textarea
                name='about' onChange={handleChange}
                size='lg'
                width='100%'
                minRows={5}
                maxRows={5}
                label="Write about you"
                placeholder="I'am developer React and ..."
                disabled={isDisable}
                value={form.about}
            />

            <Spacer y={1} />

            {
                isEdit
                    ? <Radio.Group onChange={handleChange} value={form.rol} orientation="horizontal" label="Rol Account" defaultValue="primary" >
                        <Radio size="sm" name='rol' value="recruiter" color="primary"> Recruiter </Radio>
                        <Radio size="sm" value="worker" color="secondary" name='rol'> Worker </Radio>
                    </Radio.Group>
                    : <Text size='$lg' >Currently rol: <Text b color='primary'>{form.rol}</Text></Text>
            }
            <Spacer y={2} />
            <Col css={{ gap: '3em', d: 'flex', '@xsMax': { flexDirection: 'column-reverse', gap: '2em' } }}>
                <Button css={{ w: '100%' }} ghost color='error'>Delete account</Button>
                <Button disabled={isDisable} css={{ w: '100%' }} color='primary' onPress={handleSubmit}>Save Changes</Button>
            </Col>
        </Row>
    )
}