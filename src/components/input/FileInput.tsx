"use client"

import Container from "@/components/Container"
import { cn } from "@/lib/utils"
import { useRef } from "react"

const FileInput = (props: { onFile: (file: File) => void, className?: string }) => {
    const input = useRef<HTMLInputElement>(null)

    const handleFile = (files: FileList) => {
        if (files.length != 1) {
            alert("Multiple files are not allowed.")
            return
        }

        const file = files[0]

        if (file.type != "application/json") {
            alert("Only JSON files are allowed.")
            return
        }

        props.onFile(file)
    }

    const handleDrop = (event: any) => {
        event.preventDefault()
        handleFile(event.dataTransfer!.files)
    }

    return (
        <>
            <button 
                onClick={() => input.current!.click()}
                onDrop={event => handleDrop(event)}
                onDragOver={event => {event.stopPropagation();event.preventDefault()}}
            >
                <Container className={cn("items-center px-16 flex flex-col justify-center", props.className)} dashed>
                    <h1 className="text-3xl">Drag and Drop</h1>
                    <h2 className="text-lg text-stone-600">Click to Browse</h2>
                </Container>
            </button>
            <input 
                type="file"
                name="match"
                accept=".json"
                multiple={false}
                ref={input}
                onChange={event => handleFile(event.target.files!)}
                className="hidden"
            />
        </>
    )
}

export default FileInput