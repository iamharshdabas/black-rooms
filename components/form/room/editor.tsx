"use client"

import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type Props = {
  content?: string
  onChange?: (content: string) => void
}

export function Editor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "p-4 rounded-2xl cursor-pointer bg-content2",
      },
      transformPastedText(text) {
        return text.toUpperCase()
      },
    },
    content,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <div className="w-full max-w-6xl">
      {onChange && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button
              // className='border border-divider rounded-2xl cursor-pointer bg-content1'
              className={editor.isActive("bold") ? "bg-primary" : ""}
              onPress={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </Button>
            <Button
              className={editor.isActive("italic") ? "bg-primary" : ""}
              onPress={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </Button>
            <Button
              className={editor.isActive("strike") ? "bg-primary" : ""}
              onPress={() => editor.chain().focus().toggleStrike().run()}
            >
              Strike
            </Button>
          </div>
          <Spacer y={2} />
        </>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
