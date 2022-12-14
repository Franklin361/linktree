import { Modal, Button, Text } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Element } from '../../interfaces';
import { openModal } from "../../redux";

interface Props {
    children: Element
    title: string
    desc?: string
    buttonSubmit?: Element
    scroll?: boolean
    disabled?: boolean
    fullScreen?: boolean
    customOnClose?: () => void
}

export const ModalLayout = ({ children, title, desc, buttonSubmit,
    scroll = false,
    disabled = false,
    fullScreen = false,
    customOnClose,
}: Props) => {

    const dispatch = useAppDispatch()
    const { modalOpen } = useAppSelector(state => state.ui)

    const closeHandler = () => {
        dispatch(openModal({ open: false }))
        customOnClose && customOnClose()
    }

    return (
        <Modal
            fullScreen={fullScreen}
            scroll={scroll}
            closeButton
            blur
            preventClose
            aria-labelledby="modal-title"
            open={modalOpen}
            onClose={closeHandler}
            css={{ boxShadow: 'rgba(100, 100, 111, 0.5) 0px 7px 29px 0px' }}
        >
            <Modal.Header>
                <Text size='$2xl' b css={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)', pb: '.5em', w: '100%' }}>{title}</Text>
            </Modal.Header>
            <Modal.Body>
                {
                    desc
                        ? <Text css={{ ta: 'center' }} span size='$lg'>{desc}</Text>
                        : <>{children}</>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button color='error' size='lg' disabled={disabled} auto onPress={closeHandler}>Cancel</Button>
                {
                    buttonSubmit
                        ? <>{buttonSubmit}</>
                        : <>{children}</>
                }
            </Modal.Footer>
        </Modal>
    )
}