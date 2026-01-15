import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl, id) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = id;
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split["/"][1]}`, {
    type: mimeType,
  });

  return { file, mimeType };
}
