import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { RadioGroup, Radio as NextUIRadio } from "@nextui-org/radio"
import { useState, useEffect } from "react"
import { cn } from "@nextui-org/theme"

import { RoomCategory as RoomCategorySchema, RoomSubcategory } from "@/server/schema"
import { getRoomSubCategories, getRoomCategories } from "@/server/action/room/get"
import { subtitle } from "@/config"

type Props = {
  selected: string
  setSelected: (selected: string) => void
}

export function RoomCategory({ selected, setSelected }: Props) {
  const [subcategories, setSubcategories] = useState<RoomSubcategory[]>([])
  const [categories, setCategories] = useState<RoomCategorySchema[]>([])
  const [gernal, setGernal] = useState<RoomSubcategory>()

  useEffect(() => {
    async function fetchCategories() {
      const result = await getRoomSubCategories()

      const maincategories = await getRoomCategories()
      const mainCategoriesFiltered = maincategories.filter(
        (item, index, self) => index === self.findIndex((selfItem) => selfItem.id === item.id),
      )

      setSubcategories(result)
      setCategories(mainCategoriesFiltered)
      setGernal(result.find((subcategory) => subcategory.name === "Gernal"))
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (gernal) setSelected(gernal.id)
  }, [gernal])

  const selectedCategory = subcategories.find((category) => category.id === selected)

  return (
    <RadioGroup
      isRequired
      className="w-full max-w-md gap-4"
      value={selected}
      onValueChange={setSelected}
    >
      {selected && selectedCategory && (
        <p className={subtitle()}>Selected category: {selectedCategory.name}</p>
      )}

      {gernal && <Radio key={gernal.id} subcategory={gernal} />}

      <Accordion itemClasses={{ content: "flex flex-col gap-4" }} variant="splitted">
        {categories.map((category) => (
          <AccordionItem key={category.id} title={category.name}>
            {subcategories
              .filter(
                (subcategory) =>
                  subcategory.category_id === category.id && subcategory.name !== "Gernal",
              )
              .map((subcategory) => (
                <Radio key={subcategory.id} subcategory={subcategory} />
              ))}
          </AccordionItem>
        ))}
      </Accordion>
    </RadioGroup>
  )
}

function Radio({ subcategory }: { subcategory: RoomSubcategory }) {
  return (
    <NextUIRadio
      classNames={{
        base: cn(
          "flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-2 py-2 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
      description={subcategory.description}
      value={subcategory.id}
    >
      {subcategory.name}
    </NextUIRadio>
  )
}
