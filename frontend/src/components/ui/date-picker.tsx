"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange: (date?: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
  disabled = false,
  className,
}: DatePickerProps) {
  const fixedDate = value ? new Date(
    value.getFullYear(),
    value.getMonth(),
    value.getDate(),
    12
  ) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className={cn(
            "w-full h-11 justify-start text-left font-normal border border-gray-200 bg-white text-gray-700 relative rounded-lg hover:border-gray-300 transition-all",
            !fixedDate && "text-gray-400",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          {fixedDate ? (
            <span>{format(fixedDate, "dd/MM/yyyy")}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm" align="start">
        <Calendar
          mode="single"
          selected={fixedDate}
          onSelect={(date) => {
            if (date) {
              const normalized = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                12
              );
              onChange(normalized);
            } else {
              onChange(undefined);
            }
          }}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={new Date().getFullYear() - 100}
          toYear={new Date().getFullYear()}
          formatters={{
            formatCaption: () => {
              return '';
            }
          }}
          fromDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())}
          toDate={new Date()}
          disabled={(date) => {
            return date > new Date() || 
              date < new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())
          }}
          className="border-none p-4 bg-white"
        />
      </PopoverContent>
    </Popover>
  )
}
