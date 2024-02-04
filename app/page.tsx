import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  async function LoginStatus() {
    "use server";
  }
  return (
    <section className="flex items-center justify-center bg-background mx-auto lg:max-w-6xl">
      <div className="relative items-center w-full px-5 py-12 lg:px-16 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary select-none">
                Manage Your Notes Easily
              </span>
            </span>
            <h1 className="mt-6 lg:mt-8 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes with ease
            </h1>
            <p className="max-w-xl mx-auto mt-4 md:mt-6 lg:mt-7 text-base lg:text-xl text-secondary-foreground">
              Effortlessly organize your thoughts with our intuitive notes
              management platform. Streamline productivity and never miss a
              detail &ndash; your ideas, simplified, all in one place.
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto mt-6 md:mt-8 lg:mt-10">
            <form action={LoginStatus}>
              <Button className="select-none" size="lg">
                Get Started Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
