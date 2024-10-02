import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Radio as NextUIRadio, RadioGroup } from "@nextui-org/radio"
import { cn } from "@nextui-org/theme"
import { useCallback, useEffect, useMemo, useState } from "react"

import { title } from "@/config"
import { getRoomCategoriesAction, getRoomSubCategoriesAction } from "@/server/action/room"
import { RoomCategory as RoomCategorySchema, RoomSubcategory } from "@/server/schema"

type Props = {
  selected: string
  setSelected: (selected: string) => void
}

// PERF: use react query to support suspense
export function RoomCategory({ selected, setSelected }: Props) {
  const [subcategories, setSubcategories] = useState<RoomSubcategory[]>([])
  const [categories, setCategories] = useState<RoomCategorySchema[]>([])
  const [gernal, setGernal] = useState<RoomSubcategory>()

  useEffect(() => {
    async function fetchCategories() {
      const result = await getRoomSubCategoriesAction()
      const maincategories = await getRoomCategoriesAction()
      const mainCategoriesFiltered = maincategories.filter(
        (item, index, self) => index === self.findIndex((selfItem) => selfItem.id === item.id),
      )

      setSubcategories(result)
      setCategories(mainCategoriesFiltered)
      setGernal(result.find((subcategory) => subcategory.name === "Gernal"))
    }
    fetchCategories()
  }, [])

  const handleValueChange = (id: string) => {
    const subcategory = subcategories.find((item) => item.id === id)

    if (subcategory) setSelected(subcategory.id)
  }

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.id !== gernal?.category_id),
    [categories, gernal],
  )

  const filteredSubcategories = useCallback(
    (categoryId: string) =>
      subcategories.filter(
        (subcategory) => subcategory.category_id === categoryId && subcategory.name !== "Gernal",
      ),
    [subcategories],
  )

  function selectedSubcategory() {
    return subcategories.find((subcategory) => subcategory.id === selected)
  }

  return (
    <RadioGroup
      isRequired
      className="w-full max-w-md gap-4"
      value={selected}
      onValueChange={handleValueChange}
    >
      {selected ? (
        <h1 className={title({ size: "sm", className: "pb-4" })}>
          Selected category <span className="text-success">{selectedSubcategory()?.name}</span>
        </h1>
      ) : (
        <h1 className={title({ size: "sm", className: "pb-4" })}>Select a category</h1>
      )}
      {gernal && (
        <div className="px-2">
          <Radio key={gernal.id} subcategory={gernal} />
        </div>
      )}

      <Accordion itemClasses={{ content: "flex flex-col gap-4" }} variant="splitted">
        {filteredCategories.map((category) => (
          <AccordionItem key={category.id} title={category.name}>
            {filteredSubcategories(category.id).map((subcategory) => (
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
