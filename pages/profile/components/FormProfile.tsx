import { useMutation } from '@apollo/client';
import { Button, Col, Input, Radio, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { useUserData } from '@nhost/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { UPDATE_USER } from '../../../graphql';
import { useAppDispatch, useAppSelector, useSimpleForm } from '../../../hooks';
import { User } from '../../../interfaces';
import { loadingUserState, openModal, setUser } from '../../../redux';

const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
    hour12: true,
    timeZone: 'America/Santiago'
}


export const FormProfile = () => {

    const user = useUserData()

    const dispatch = useAppDispatch()
    const { user: userState, loadingUser, isEdit } = useAppSelector(state => state.user)

    const [mutateUser] = useMutation(UPDATE_USER)

    const getInitialValue = useCallback(
        (prop: keyof Omit<User, 'id' | 'email' | 'avatarUrl'>) => userState ? userState[prop] : (user as any)?.[prop] || '',
        [],
    )

    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues: {
            displayName: getInitialValue('displayName'),
            phone: getInitialValue('phone'),
            web: getInitialValue('web'),
            about: getInitialValue('about'),
            rol: getInitialValue('rol')
        },
        onSubmit: async () => {
            const { displayName, ...rest } = form

            if (!user || !user?.email) return

            const { avatarUrl, id, email } = user

            try {
                dispatch(loadingUserState(true))
                await mutateUser({
                    variables: {
                        id,
                        displayName,
                        metadata: { ...rest }
                    }
                })
                dispatch(setUser({ ...form, avatarUrl, email, id }))
                toast.success('Updated successfully!', { id: 'only', })
            } catch (error) {
                toast.success(error as string, { id: 'only', })
            } finally {
                dispatch(loadingUserState(false))
            }
        }
    })

    const handleDelete = () => dispatch(openModal(true))

    if (!user) return null

    const { createdAt, email, emailVerified } = user

    const isDisable = loadingUser || !isEdit

    return (

        <Row css={{ d: 'flex', flexDirection: 'column' }}>
            <Spacer y={1} />

            <Text size='$lg' >Account created at: <Text b color='primary'>
                {Intl.DateTimeFormat('en', options).format(new Date(createdAt))}
            </Text></Text>

            <Text size='$lg'>E-mail: <Text b color='primary' css={{ wordBreak: 'break-word' }}>{email}</Text></Text>
            {
                emailVerified ? <Text b size='$sm' color='success'>E-mail verified!</Text> : <Text b size='$sm' color='warning'>E-mail not verified</Text>
            }
            <Spacer y={1} />

            <Input
                name='displayName'
                onChange={handleChange}
                disabled={isDisable}
                size='lg'
                width='100%'
                label="Full Name"
                value={form.displayName} />
            <Spacer y={.5} />

            <Input
                name='phone'
                onChange={handleChange}
                disabled={isDisable}
                size='lg'
                width='100%'
                label="Phone number"
                value={form.phone}
                placeholder='+00 00 0000 0000' />
            <Spacer y={.5} />

            <Input
                name='web'
                onChange={handleChange}
                disabled={isDisable}
                size='lg'
                width='100%'
                label="Portfolio web"
                value={form.web}
                placeholder='www.website.com' />
            <Spacer y={.5} />

            <Textarea
                name='about'
                onChange={handleChange}
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
                    ? <Radio.Group
                        onChange={handleChange}
                        value={form.rol}
                        orientation="horizontal"
                        label="Rol Account"
                        defaultValue="primary"
                    >
                        <Radio
                            size="sm"
                            name='rol'
                            value="recruiter"
                            color="primary"
                        > Recruiter </Radio>
                        <Radio
                            size="sm"
                            value="worker"
                            color="secondary"
                            name='rol'
                        > Worker </Radio>
                    </Radio.Group>
                    : <Text size='$lg' >Currently rol: <Text b color='primary'>{form.rol}</Text></Text>
            }
            <Spacer y={2} />
            <Col
                css={{ gap: '3em', d: 'flex', '@xsMax': { flexDirection: 'column-reverse', gap: '2em' } }}
            >
                <Button
                    css={{ w: '100%' }}
                    ghost
                    color='error'
                    onPress={handleDelete}
                >Delete account</Button>

                <Button
                    disabled={isDisable}
                    css={{ w: '100%' }}
                    color='primary'
                    onPress={handleSubmit}
                >Save Changes</Button>
            </Col>
        </Row>
    )
}