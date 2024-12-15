import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { usePathname } from "next/navigation";

type SliderType = {
    children: React.ReactNode,
    items: {
        href: string;
        label: string;
    }[]
}

export function SideBarSheet({ children, items }: SliderType) {
    const pathName = usePathname()
    return (
        <Sheet >

            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            
            <SheetContent className="bg-gray-400">
                <SheetHeader>
                    <SheetTitle className="hidde">
                        Useful Links
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col mt-6 gap-8 text-sm text-gray-700 *:transition-colors *:ease-linear *:duration-300">
                    {items.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`hover:text-primary ${pathName === href ? 'text-primary font-semibold' : ''
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                   <Link href={"/auth/login"} >
                    <Button  className="transition-all w-full ease-linear duration-500">
                        LOGIN
                    </Button>
                   </Link>
                </div>

            </SheetContent>
        </Sheet>
    )
}