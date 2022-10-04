import { Grid } from '@nextui-org/react';
import { NextPage } from 'next';
import { useState } from 'react';
import { MainLayout } from '../../components';
import withAuth from '../../components/withAuth';
import { FormProfile, ImageProfile, SwitchProfile } from './components';


const ProfilePage: NextPage = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <MainLayout title='LinkTree | Profile'>
            <Grid justify='center' css={{ maxW: '500px', margin: '1em auto 2em auto' }}>

                <SwitchProfile handleChangeEdit={() => setIsEdit(prev => !prev)} isLoading={isLoading} />

                <ImageProfile isEdit={isEdit} />

                <FormProfile isEdit={isEdit} handleLogin={loading => setIsLoading(loading)} />

            </Grid>
        </MainLayout>
    )
}
export default withAuth(ProfilePage)

