import Container from "@/components/Container"
import { notify } from "@/components/provider/impl/NotificationProvider"
import { cn } from "@/lib/utils/cn"
import { useRef } from "react"

const FileInput = (props: { 
    /**
     * Called when a valid file is uploaded.
     * 
     * @param file
     */
    onFile: (file: File) => void, 

    /**
     * The input outer className.
     */
    outer?: string, 

    /**
     * The input inner className.
     */
    inner?: string, 

    /**
     * The file format to allow.
     */
    accept: string,
}) => {
    const ref = useRef<HTMLInputElement>(null)

    /**
     * Called when a file is uploaded,
     * used to validate the files.
     * 
     * @param files The files uploaded.
     */
    const handleFile = (files: FileList) => {
        // Dont allow multiple files being uploaded.
        if (files.length != 1) {
            notify.error("Multiple files are not allowed!")
            return
        }

        const file = files[0]

        // Only allow the file type specified in the props.
        if (file.type != props.accept) {
            notify.error("Invalid file type!")
            return
        }

        // Invoke the onFile callback.
        props.onFile(file)
    }

    return <>
        <button 
            className={cn("rounded-lg", props.outer)}
            onClick={() => ref.current!.click()} 

            onDragOver={event => {
                event.stopPropagation()
                event.preventDefault()
            }}

            onDrop={event => {
                event.preventDefault()
                handleFile(event.dataTransfer.files)
            }}
        >
            <Container inner={cn("flex items-center justify-center flex-col border-dashed h-full", props.inner)} outer="h-full">
                <h1 className="text-3xl text-primary">Drag and Drop</h1>
                <h1 className="text-lg text-secondary">Click to Browse</h1>
            </Container>
        </button>
        <input
            type="file"
            name="upload"
            accept={props.accept}
            multiple={false}
            ref={ref}
            onChange={({ target }) => handleFile(target.files!)}
            className="hidden"
        />
    </>
}

export default FileInput