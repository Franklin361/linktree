import { Grid, Text, Modal, Input, Row, Checkbox, Button } from '@nextui-org/react';
import { NextPage } from 'next';
import { MainLayout } from '../../components';
import withAuth from '../../components/withAuth';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openModal } from '../../redux';
import { FormProfile, ImageProfile, SwitchProfile } from './components';


const ProfilePage: NextPage = () => {

    return (
        <MainLayout title='LinkTree | Profile'>
            <CustomModal />
            <Grid justify='center' css={{ maxW: '500px', margin: '1em auto 2em auto' }}>

                <SwitchProfile />

                <ImageProfile />

                <FormProfile />

            </Grid>
        </MainLayout>
    )
}
export default withAuth(ProfilePage)

export const CustomModal = () => {

    const dispatch = useAppDispatch()
    const { modalOpen } = useAppSelector(state => state.ui)

    const closeHandler = () => dispatch(openModal(false))

    return (
        <Modal
            closeButton
            blur
            preventClose
            aria-labelledby="modal-title"
            open={modalOpen}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" b size={18}>
                    Delete Account
                </Text>
            </Modal.Header>
            <Modal.Body>
                <div>Are you sure?</div>
            </Modal.Body>
            <Modal.Footer>
                <Button auto color="error" onClick={closeHandler}>
                    Cancel
                </Button>
                <Button auto ghost onClick={closeHandler}>
                    Yes, delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}