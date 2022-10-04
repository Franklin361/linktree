import { NextPage } from 'next';
import { LoadingFullScreen, MainLayout } from '../components';
import { useUserData } from '@nhost/react';
import { Image, Row, Input, Text, Button, Switch, Radio, Grid, Spacer, Textarea } from '@nextui-org/react';
import withAuth from '../components/withAuth';
import { useState } from 'react';
import { useSimpleForm } from '../hooks';


const ProfilePage: NextPage = () => {

    const user = useUserData()

    const [isEdit, setIsEdit] = useState(false)

    const { form, handleChange, handleSubmit } = useSimpleForm({
        initValues: {
            name: user?.displayName || '',
            phone: user?.phoneNumber || '',
            web: user?.metadata?.web || '',
            about: user?.metadata?.about || '',
            rol: user?.defaultRole || ''
        },
        onSubmit: async () => {
            console.log(form)
        }
    })

    if (!user) return <LoadingFullScreen />

    const { avatarUrl, createdAt, defaultRole, displayName, emailVerified, id, metadata, phoneNumber, email } = user

    return (
        <MainLayout title='LinkTree | Profile'>
            <Grid justify='center' css={{ maxW: '500px', margin: '1em auto 2em auto' }}>
                <Row css={{ borderBottom: '1px solid $text', pb: '1em', mb: '1em', gap: '1em', alignItems: 'center' }} justify='flex-end'>
                    <Text b>Edit Info</Text>
                    <Switch shadow color="primary" checked={false} onChange={() => setIsEdit(prev => !prev)} />
                </Row>
                <Row css={{ alignItems: 'center', '@xsMax': { flexDirection: 'column' } }} justify='flex-end'>
                    {
                        isEdit ? <Button ghost >Change image</Button> : <Text size='$lg' b>Profile image:</Text>
                    }
                    <Spacer css={{ flex: '1' }} />
                    <Image
                        showSkeleton
                        maxDelay={10000}
                        src={avatarUrl}
                        alt="Default Image"
                    />
                </Row>
                <Row css={{ d: 'flex', flexDirection: 'column' }}>
                    <Spacer y={1} />
                    <Text size='$lg' >Account created at: <Text b color='primary'>{new Intl.DateTimeFormat('en').format(new Date(createdAt).getTime()).toString()}</Text></Text>
                    <Text size='$lg'>E-mail: <Text b color='primary' css={{ wordBreak: 'break-word' }}>{email}</Text></Text>
                    {
                        emailVerified ? <Text b size='$sm' color='success'>E-mail verified!</Text> : <Text b size='$sm' color='warning'>E-mail not verified</Text>
                    }
                    <Spacer y={1} />
                    <Input disabled={!isEdit} size='lg' width='100%' label="Full Name" value={displayName} />
                    <Spacer y={.5} />
                    <Input disabled={!isEdit} size='lg' width='100%' label="Phone number" value={phoneNumber || ''} type='tel' placeholder='+00 00 0000 0000' />
                    <Spacer y={.5} />
                    <Input disabled={!isEdit} size='lg' width='100%' label="Portfolio web" value={metadata?.portfolio as string || ''} type='text' placeholder='www.website.com' />
                    <Spacer y={.5} />
                    <Textarea
                        size='lg'
                        width='100%'
                        minRows={5}
                        maxRows={5}
                        label="Write about you"
                        placeholder="I'am developer React and ..."
                        disabled={!isEdit}
                    />
                    <Spacer y={1} />
                    {
                        isEdit
                            ? <Radio.Group orientation="horizontal" label="Rol Account" defaultValue="primary" >
                                <Radio size="sm" value="primary" color="primary">
                                    Recruiter
                                </Radio>
                                <Radio size="sm" value="secondary" color="secondary">
                                    Worker
                                </Radio>
                            </Radio.Group>
                            : <Text size='$lg' >Currently rol: <Text b color='primary'>{defaultRole}</Text></Text>
                    }

                </Row>
                <Spacer y={2} />
                <Row css={{ gap: '3em', '@xsMax': { flexDirection: 'column-reverse', gap: '2em' } }}>
                    <Button css={{ w: '100%' }} ghost color='error'>Delete account</Button>
                    <Button disabled={!isEdit} css={{ w: '100%' }} color='primary' onPress={handleSubmit}>Save Changes</Button>
                </Row>
            </Grid>
        </MainLayout>
    )
}
export default withAuth(ProfilePage)