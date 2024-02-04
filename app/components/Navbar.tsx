import Link from "next/link";
import { Themetoggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession(); // checking if user is authenticated or not
  const user = await getUser();
  const fullName = `${user?.given_name ?? ""} ${user?.family_name ?? ""}`;
  return (
    <nav className="border-b-2 bg-background flex items-center justify-between p-5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl select-none">SaaS</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-5">
        <Themetoggle />
        {(await isAuthenticated()) ? ( // authentication checking
          <div>
            <UserNav
              name={fullName as string}
              email={user?.email as string}
              image={user?.picture as string}
            />
          </div>
        ) : (
          <div className="flex items-center gap-x-2 lg:md:gap-x-5">
            <LoginLink>
              {/* Kinde Login Tag */}
              <Button className="select-none w-16">Sign In</Button>
            </LoginLink>
            <RegisterLink>
              {/* Kinde Register Tag */}
              <Button variant="secondary" className="select-none w-16">
                Sign Up
              </Button>
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}
