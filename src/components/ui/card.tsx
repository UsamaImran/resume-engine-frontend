import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
      className,
    )}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className }: CardProps) => (
  <div className={cn("mb-4", className)}>{children}</div>
);

export const CardTitle = ({ children, className }: CardProps) => (
  <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className }: CardProps) => (
  <p className={cn("text-sm text-gray-500", className)}>{children}</p>
);

export const CardContent = ({ children, className }: CardProps) => (
  <div className={cn("", className)}>{children}</div>
);

export const CardFooter = ({ children, className }: CardProps) => (
  <div
    className={cn("mt-4 flex items-center justify-end space-x-2", className)}
  >
    {children}
  </div>
);
