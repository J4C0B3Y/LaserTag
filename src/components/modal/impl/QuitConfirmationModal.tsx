import Button from "@/components/Button"
import Modal from "@/components/modal/Modal"

const QuitConfirmationModal = (props: { open: boolean, setOpen: (open: boolean) => void, onConfirm: () => void }) => {

    return (
        <Modal
            title="Are you sure you would like to quit?"
            subtitle="This action is irreversible and cannot be undone."
            open={props.open}
        >
            <Button
                text="CANCEL"
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