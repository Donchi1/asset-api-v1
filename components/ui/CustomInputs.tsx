import { InputFieldProps, SelectFieldProps } from "@/types/inputs";
import { PasswordFieldProps } from "@/types/inputs";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./select";

export const InputField: React.FC<InputFieldProps> = ({ label, id, error, className, ...props }) => (
  <div className="space-y-3 w-full">

    <Label htmlFor={id} >
      {label}
    </Label>
    <Input
      id={id}
      className={cn(`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${error ? "border-red-500" : ""
        }`, className)}
      {...props}
    />
  </div>
);
export const TextAreaField: React.FC<InputFieldProps> = ({ label, id, error, className, ...props }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <Textarea
      id={id}
      className={cn(`text-white resize-none  hover:border-primary py-4 px-3 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${error ? "border-red-500" : ""
        }`, className)}
      {...props}
    />
  </div>
);

export const PasswordField: React.FC<PasswordFieldProps> = ({ label, id, showPwd, setShowPwd, error, ...props }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>
    <div className="relative">
      <Input
        id={id}
        type={showPwd ? "text" : "password"}
        className={`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${error ? "border-red-500" : ""
          }`}
        {...props}
      />
      <span
        className="absolute right-3 top-3 cursor-pointer"
        onClick={() => setShowPwd((prev) => !prev)}
      >
        {showPwd ? <Eye className="text-white" size={18} /> : <EyeOff className="text-white" size={18} />}
      </span>
    </div>
  </div>
);
export const SelectField: React.FC<SelectFieldProps> = ({ label, id,items,onChange,className,value,  error }) => (
  <div className="space-y-3 w-full">
    <label htmlFor={id} className="text-primary">
      {label}
    </label>

    <Select
    onValueChange={(val) => onChange(val) }
    value={value}
    >
      <SelectTrigger id={id}  className={cn(`text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-full ${error ? "border-red-500" : ""
        }`, className)}>
        <SelectValue  />
      </SelectTrigger>
      <SelectContent className="bg-sidebar  text-white border-0 shadow shadow-primary-gray/20 ">
        {items.map(each => (

        <SelectItem className="hover:!bg-primary/10 :bg-primary/10 focus:!bg-primary/10 !text-primary-light hover:!text-primary-light" key={each as string} value={each as string}>{each}</SelectItem>
        ))}
      </SelectContent>
    </Select>


  </div>
);