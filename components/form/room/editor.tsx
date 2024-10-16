"use client"

import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import Link from "@tiptap/extension-link"
import { EditorContent, Editor as EditorType, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from "lucide-react"
import { useMemo } from "react"

import { processUrl } from "@/utils/url"

type Props = {
  content?: string
  onChange?: (content: string) => void
}

export function Editor({ content, onChange }: Props) {
  const editorConfig = useMemo(
    () => ({
      extensions: [StarterKit, Link],
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
      icon: <BoldIcon />,
      isActive: editor.isActive("bold"),
      toggle: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: <ItalicIcon />,
      isActive: editor.isActive("italic"),
      toggle: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      icon: <StrikethroughIcon />,
      isActive: editor.isActive("strike"),
      toggle: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Link",
      icon: <LinkIcon />,
      isActive: editor.isActive("link"),
      toggle: () => {
        let url = prompt("Enter the URL")

        if (url) {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: processUrl(url) })
            .run()
        }
      },
    },
    {
      label: "Code Block",
      icon: <CodeIcon />,
      isActive: editor.isActive("codeBlock"),
      toggle: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Heading 1",
      icon: <Heading1Icon />,
      isActive: editor.isActive("heading", { level: 1 }),
      toggle: () => editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run(),
    },
    {
      label: "Heading 2",
      icon: <Heading2Icon />,
      isActive: editor.isActive("heading", { level: 2 }),
      toggle: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Unordered List",
      icon: <ListIcon />,
      isActive: editor.isActive("bulletList"),
      toggle: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: <ListOrderedIcon />,
      isActive: editor.isActive("orderedList"),
      toggle: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Undo",
      icon: <UndoIcon />,
      isActive: false,
      toggle: () => editor.chain().focus().undo().run(),
    },
    {
      label: "Redo",
      icon: <RedoIcon />,
      isActive: false,
      toggle: () => editor.chain().focus().redo().run(),
    },
  ]

  return (
    <div className="w-full">
      {onChange && (
        <div className="flex flex-wrap gap-2">
          {buttons.map(({ icon, isActive, label, toggle }) => (
            <Button
              key={label}
              isIconOnly
              className={isActive ? "border-primary" : ""}
              variant="bordered"
              onPress={toggle}
            >
              {icon}
            </Button>
          ))}
        </div>
      )}
      <Spacer y={2} />
      <EditorContent editor={editor} />
    </div>
  )
}
