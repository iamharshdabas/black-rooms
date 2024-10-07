"use client"

import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import { useEditor, EditorContent, Editor as EditorType } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useMemo } from "react"

type Props = {
  content?: string
  onChange?: (content: string) => void
}

export function Editor({ content, onChange }: Props) {
  const editorConfig = useMemo(
    () => ({
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class: "rounded-2xl bg-content1 p-4 focus:outline-none focus:ring-2 focus:ring-divider",
        },
      },
      content,
      onUpdate: ({ editor }: { editor: EditorType }) => {
        if (onChange) onChange(editor.getHTML())
      },
      editable: !!onChange,
      immediatelyRender: false,
    }),
    [content, onChange],
  )

  const editor = useEditor(editorConfig)

  if (!editor) return null

  const buttons = [
    {
      label: "Bold",
      isActive: editor.isActive("bold"),
      toggle: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      isActive: editor.isActive("italic"),
      toggle: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      isActive: editor.isActive("strike"),
      toggle: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Code Block",
      isActive: editor.isActive("codeBlock"),
      toggle: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Heading 1",
      isActive: editor.isActive("heading", { level: 1 }),
      toggle: () => editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run(),
    },
    {
      label: "Heading 2",
      isActive: editor.isActive("heading", { level: 2 }),
      toggle: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Unordered List",
      isActive: editor.isActive("bulletList"),
      toggle: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      isActive: editor.isActive("orderedList"),
      toggle: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Undo",
      isActive: false,
      toggle: () => editor.chain().focus().undo().run(),
    },
    {
      label: "Redo",
      isActive: false,
      toggle: () => editor.chain().focus().redo().run(),
    },
  ]

  return (
    <div className="w-full max-w-6xl">
      {onChange && (
        <div className="flex flex-wrap gap-2">
          {buttons.map(({ label, isActive, toggle }) => (
            <Button
              key={label}
              className={isActive ? "border-primary" : ""}
              variant="bordered"
              onPress={toggle}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
      <Spacer y={2} />
      <EditorContent editor={editor} />
    </div>
  )
}
