"use client"

import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { cn } from "@nextui-org/theme"

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroup className="w-full max-w-md gap-4">
        <Accordion itemClasses={{ content: "flex flex-col gap-4" }} variant="splitted">
          {data.map((item) => (
            <AccordionItem key={item.name} title={item.name}>
              {item.subcategories.map((subcategory) => (
                <Radio
                  key={subcategory.name}
                  classNames={{
                    base: cn(
                      "flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary",
                    ),
                  }}
                  value={subcategory.name}
                >
                  {subcategory.name}
                </Radio>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </RadioGroup>
    </div>
  )
}

const data = [
  {
    name: "Interests and Hobbies",
    subcategories: [
      {
        name: "Arts and Crafts",
        keywords: ["painting", "knitting", "DIY"],
      },
      {
        name: "Books and Writing",
        keywords: ["literature", "poetry", "book clubs"],
      },
      {
        name: "Games",
        keywords: ["board games", "video games", "tabletop RPGs"],
      },
      {
        name: "Music",
        keywords: ["rock", "pop", "classical", "instruments", "bands"],
      },
      {
        name: "Movies and TV",
        keywords: ["film discussions", "fandoms"],
      },
      {
        name: "Sports",
        keywords: ["teams", "leagues", "fitness"],
      },
      {
        name: "Travel",
        keywords: ["destinations", "backpacking", "cultural exchange"],
      },
    ],
  },
  {
    name: "Social and Lifestyle",
    subcategories: [
      {
        name: "Parenting and Family",
        keywords: ["parenting advice", "baby groups"],
      },
      {
        name: "Relationships",
        keywords: ["dating", "marriage", "friendships"],
      },
      {
        name: "Health and Wellness",
        keywords: ["fitness", "nutrition", "mental health"],
      },
      {
        name: "Pets",
        keywords: ["dogs", "cats", "other animals"],
      },
      {
        name: "Food and Drink",
        keywords: ["cooking", "recipes", "wine clubs"],
      },
      {
        name: "Fashion and Beauty",
        keywords: ["style", "makeup", "skincare"],
      },
      {
        name: "Technology",
        keywords: ["gadgets", "software", "tech support"],
      },
    ],
  },
  {
    name: "Education and Learning",
    subcategories: [
      {
        name: "Academic Subjects",
        keywords: ["science", "math", "history"],
      },
      {
        name: "Language Learning",
        keywords: ["English", "Spanish", "French"],
      },
      {
        name: "Professional Development",
        keywords: ["career advice", "industry-specific groups"],
      },
      {
        name: "Online Courses",
        keywords: ["MOOCs", "tutorials"],
      },
      {
        name: "Teaching and Tutoring",
        keywords: ["offering help", "seeking help"],
      },
    ],
  },
  {
    name: "Causes and Social Issues",
    subcategories: [
      {
        name: "Politics",
        keywords: ["current events", "political parties"],
      },
      {
        name: "Environmentalism",
        keywords: ["climate change", "sustainability"],
      },
      {
        name: "Social Justice",
        keywords: ["equality", "human rights"],
      },
      {
        name: "Charity and Non-Profits",
        keywords: ["fundraising", "volunteering"],
      },
    ],
  },
  {
    name: "Niche Categories",
    subcategories: [
      {
        name: "Gaming",
        keywords: ["MMORPG", "FPS", "MOBA"],
      },
      {
        name: "Anime and Manga",
        keywords: ["fandoms", "cosplay"],
      },
      {
        name: "Cosmetics",
        keywords: ["brands", "tutorials", "reviews"],
      },
      {
        name: "Cryptocurrency",
        keywords: ["Bitcoin", "Ethereum", "blockchain"],
      },
      {
        name: "Sci-Fi and Fantasy",
        keywords: ["fandoms", "worldbuilding"],
      },
    ],
  },
]
