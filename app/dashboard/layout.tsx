import { ReactNode } from "react";
import { DashBoardNav } from "../components/DashBoardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  await getData({
    email: user.email as string,
    id: user.id as string,
    firstName: user.given_name as string,
    lastName: user.family_name as string,
    profileImage: user.picture as string,
  });
  return (
    <div className="flex flex-col space-y-6 my-10">
      <div className="container grid lg:flex-1 gap-12 lg:grid-cols-[200px_1fr]">
        <aside className="lg:w-[200px] flex-col md:flex">
          {/* left side of the dashboard section */}
          <DashBoardNav />
        </aside>
        <main>{children}</main> {/* right side of the dashboard section */}
      </div>
    </div>
  );
}
