import { toast } from "@/hooks/use-toast";

export const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {  
        toast({description:"text successfully copied", variant: "success"})
      })
      .catch((err) => toast({description:"Failed to copy wallet address:" + err}));
  };