"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Radio as NextUIRadio, RadioGroup } from "@nextui-org/radio"
import { cn } from "@nextui-org/theme"
import { useEffect, useState } from "react"

import { getRoomCategories } from "@/server/action/room/get"
import { RoomSubcategory, RoomCategory } from "@/server/schema"

type Props = {
  id: string
  name: string
  desc: string
}

export function Radio({ id, name, desc }: Props) {
  return (
    <NextUIRadio
      key={id}
      classNames={{
        base: cn(
          "flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
      description={desc}
      value={id}
    >
      {name}
    </NextUIRadio>
  )
}

export default function Page() {
  const [categories, setCategories] = useState<(RoomSubcategory & { category: RoomCategory })[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const result = await getRoomCategories()

      setCategories(result)
    }
    fetchCategories()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroup className="w-full max-w-md gap-4">
        <Accordion itemClasses={{ content: "flex flex-col gap-4" }} variant="splitted">
          {categories.map((subcategory) => (
            <AccordionItem key={subcategory.id} title={subcategory.category.name}>
              <Radio
                key={subcategory.id}
                desc={subcategory.description}
                id={subcategory.id}
                name={subcategory.name}
              />
            </AccordionItem>
          ))}
        </Accordion>
      </RadioGroup>
    </div>
  )
}
