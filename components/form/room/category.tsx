import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Radio as NextUIRadio, RadioGroup } from "@nextui-org/radio"
import { cn } from "@nextui-org/theme"
import { useCallback, useMemo } from "react"
import { Spinner } from "@nextui-org/spinner"
import { toast } from "sonner"

import { title } from "@/config"
import { useGetRoomSubCategories } from "@/hooks/room"
import { RoomSubCategory } from "@/server/schema"

type Props = {
  selected: string
  setSelected: (selected: string) => void
}

export function RoomCategory({ selected, setSelected }: Props) {
  const subcategories = useGetRoomSubCategories()

  const gernal = subcategories.data?.find((subcategory) => subcategory.name === "Gernal")

  const uniqueCategories = useMemo(() => {
    const uniqueCategories = subcategories.data?.map((category) => category.roomCategories)

    return uniqueCategories?.filter(
      (category, index) => uniqueCategories.findIndex((item) => item.id === category.id) === index,
    )
  }, [subcategories.data])

  const filteredCategories = useMemo(
    () => uniqueCategories?.filter((category) => category.name !== "Gernal"),
    [uniqueCategories],
  )

  const selectedSubcategory = useMemo(
    () => subcategories.data?.find((subcategory) => subcategory.id === selected),
    [subcategories.data, selected],
  )

  const filteredSubcategories = useCallback(
    (categoryId: string) => {
      return (
        subcategories.data?.filter(
          (subcategory) => subcategory.categoryId === categoryId && subcategory.name !== "Gernal",
        ) || []
      )
    },
    [subcategories.data],
  )

  const handleValueChange = useCallback(
    (id: string) => {
      const category = subcategories.data?.find((item) => item.id === id)

      if (category) setSelected(category.id)
    },
    [subcategories.data, setSelected],
  )

  if (subcategories.isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!subcategories.isLoading && subcategories.isError) {
    toast.error(subcategories.error?.message ?? "An error occurred")

    return null
  }

  return (
    <RadioGroup
      isRequired
      className="w-full max-w-md gap-4"
      value={selected}
      onValueChange={handleValueChange}
    >
      {selected && filteredCategories ? (
        <h1 className={title({ size: "sm", className: "pb-4" })}>
          Selected category <span className="text-success">{selectedSubcategory?.name}</span>
        </h1>
      ) : (
        <h1 className={title({ size: "sm", className: "pb-4" })}>Select a category</h1>
      )}
      {gernal && (
        <div className="px-2">
          <Radio key={gernal.id} subcategory={gernal} />
        </div>
      )}

      <Accordion variant="splitted">
        {(filteredCategories || []).map((category) => (
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

function Radio({ subcategory }: { subcategory: RoomSubCategory }) {
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
