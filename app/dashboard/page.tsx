import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { TrashDelete } from "../components/SubmitButton";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  async function deleteNote(formData: FormData) {
    "use server";
    const noteid = formData.get("noteId") as string;
    await prisma.note.delete({
      where: {
        id: noteid,
      },
    });
    revalidatePath("/dashboard");
  }
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex justify-around lg:md:flex lg:md:flex-row items-center lg:md:justify-between gap-2">
        <div className="grid gap-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl">Your Notes</h1>
          <p className="text-xs md:text-sm lg:text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new" className="select-none">Create a new note</Link>
        </Button>
      </div>
      {data.length < 1 ? (
        <div className="flex min-h-[400px] items-center justify-center flex-col rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don&apos;t have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground">
            Create notes to see them right here
          </p>
          <Button asChild>
            <Link href="/dashboard/new" className="select-none">Create a new note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div className="">
                <h2 className="font-semibold text-xl text-primary">
                  {item.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(item.createdAt))}
                </p>
              </div>
              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={item.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
