import { Grid } from '@nextui-org/react';
import { NextPage } from 'next';
import { MainLayout, ModalDeleteUser } from '../../components';
import withAuth from '../../components/withAuth';
import { useAppSelector } from '../../hooks';
import { FormProfile, ImageProfile, SwitchProfile } from '../../components';


const ProfilePage: NextPage = () => {

    const { typeModal } = useAppSelector(state => state.ui)

    return (
        <MainLayout title='LinkTree | Profile'>
            <>{typeModal === 'disabled-account' && <ModalDeleteUser />}</>
            <Grid justify='center' css={{ maxW: '500px', margin: '1em auto 2em auto' }}>

                <SwitchProfile />

                <ImageProfile />

                <FormProfile />

            </Grid>
        </MainLayout>
    )
}
export default withAuth(ProfilePage)
