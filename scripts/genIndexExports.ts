import fs from "fs"
import path from "path"

// what is this ?
// generate index.ts file with export * from "./path"
// go to the directory where you want to generate index.ts file
// run `bun path/to/genIndexExports.ts` in terminal

const directoryPath = process.cwd()
const outputPath = path.join(directoryPath, "index.ts")

function getFilesRecursively(dir: string): string[] {
  const results: string[] = []
  const list = fs.readdirSync(dir)

  for (const file of list) {
    const filePath = path.resolve(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      results.push(...getFilesRecursively(filePath))
    } else {
      results.push(filePath)
    }
  }

  return results
}

const files = getFilesRecursively(directoryPath)
  .filter((file) => /\.(tsx|ts)$/.test(file) && !file.endsWith("index.ts"))
  .map((file) => {
    const relativePath = path.relative(directoryPath, file).replace(/\\/g, "/")

    return `export * from "./${relativePath.replace(/\.[tj]sx?$/, "")}"`
  })

fs.writeFileSync(outputPath, files.join("\n"), "utf8")
