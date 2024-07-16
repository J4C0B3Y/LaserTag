import Container from "@/components/Container"
import { notify } from "@/components/provider/impl/NotificationProvider"
import { cn } from "@/lib/utils/cn"
import { useRef } from "react"

const FileInput = (props: { onFile: (files: File) => void, className?: string, accept?: string }) => {
    const ref = useRef<HTMLInputElement>(null)

    const handleFile = (files: FileList) => {
        if (files.length != 1) {
            notify.error("Multiple files are not allowed!")
            return
        }

        const file = files[0]

        if (file.type != props.accept) {
            notify.error("Invalid file type!")
            return
        }

        props.onFile(file)
    }

    return <>
        <button 
            className={cn("rounded-lg", props.className)}
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
            <Container inner="flex items-center justify-center flex-col border-dashed h-full" outer="h-full">
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