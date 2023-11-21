"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "primary"
    | "ghost"
    | "link";
}

export const FormSubmit = ({children, disabled, className, variant = "primary"} : FormSubmitProps) => {
    const {pending} = useFormStatus();

    return (
        <Button
        disabled={pending || disabled}
        type={"submit"}
        variant={variant}
        size={"sm"}
        className={className}
        >
            {children}
        </Button>
    ) 
}
