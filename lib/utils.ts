import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWithSeparator(num: number | string, separator: string = ','): string {
  const [integer, decimal] = num.toString().split('.');

  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return decimal ? `${formatted}.${decimal}` : formatted;
}