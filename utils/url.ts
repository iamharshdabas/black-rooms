import { toast } from "sonner"

export function processUrl(url: string): string | null {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url
  }

  // if url doesn't start with http:// or https:// even after adding https://, it's invalid
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    toast.warning("Url is invalid")
  }

  return url
}
