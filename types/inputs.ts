import { SelectProps } from "@radix-ui/react-select";

export type InputFieldProps = {
    label: string;
    id: string;
    error?: string | false;
    className?: string
    [key: string]: unknown;
  };
  
  export type PasswordFieldProps = {
    label: string;
    id: string;
    showPwd: boolean;
    setShowPwd: React.Dispatch<React.SetStateAction<boolean>>;
    error?: string | false;
    [key: string]: unknown;
  };
  export type SelectFieldProps = {
    label: string;
    id: string;
    error?: string | false;
    items:string[] | boolean[]
    value?: string;
    className?: string
    onChange: (value: string) => void
    [key: string]: unknown;
  };