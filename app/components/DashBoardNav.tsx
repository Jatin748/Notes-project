"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navitems } from "./UserNav";


export function DashBoardNav() {
  const pathname = usePathname(); // getting the pathname from the search bar and checking if pathname is equal to to item href
  return (
    <nav className="grid items-start gap-2">
      {Navitems.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname == item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4 text-primary" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
