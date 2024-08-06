import Button from "@/components/Button"
import Modal from "@/components/modal/Modal"

/**
 * @author J4C0B3Y
 * @since 6/08/2024
 * @version LaserTag
 */

const QuitConfirmationModal = (props: { 
    /**
     * If the modal is open.
     */
    open: boolean, 

    /**
     * The function to set if the modal is open.
     * 
     * @param open 
     */
    setOpen: (open: boolean) => void, 

    /**
     * Called if the confirm button is clicked.
     */
    onConfirm: () => void 
}) => {
    return (
        <Modal
            title="Are you sure you would like to quit?"
            subtitle="This action is irreversible and cannot be undone."
            open={props.open}
        >
            <Button
                text="CANCEL"
                // Close the modal if the cancel button is pressed.
                onClick={() => props.setOpen(false)}
            />
            <Button
                text="CONFIRM"
                className="bg-quit"
                onClick={props.onConfirm}
            />
        </Modal>
    )
}

export default QuitConfirmationModal
