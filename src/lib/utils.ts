import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// import { cn } from "@/lib/utils"
//
// const buttonClass = cn(
//   "px-4 py-2 font-bold",
//   isActive && "bg-blue-500 text-white",
//  !isActive && "bg-gray-300 text-black"
// )

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
