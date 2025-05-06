"use client";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  return (
    <div className={`p-3 rounded-lg bg-red-50 text-red-700 ${className}`}>
      {message}
    </div>
  );
}