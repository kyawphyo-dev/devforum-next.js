import Image from "next/image";
import { SiDevbox } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function page() {
  return (
    <div className="max-w-5xl min-h-screen mx-auto flex">
      <div className="flex shadow-2xl shadow-primary my-20">
        <div className="w-1/2 flex items-center justify-center">
          <div className="space-y-10 ps-10">
            <div className="flex items-center ">
              <SiDevbox className="text-6xl text-blue-600" />
              <h1 className="text-5xl font-bold">
                <span className="text-blue-600">.dev</span> forum
              </h1>
            </div>
            <p className="text-text-muted">
              Dev Forum is a community for developers to ask questions, share
              knowledge, and discuss modern technologies. It supports learners
              and professionals in improving skills and staying updated with
              industry trends.
            </p>
            <button className="border border-border px-auto py-3 w-full rounded-sm hover:bg-secondary">
              Create a new account?
            </button>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-sm space-y-6  p-8 rounded-lg border border-border">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-main-text">
                Welcome Back!
              </h2>
              <p className="text-sm text-text-muted">
                Enter your credentials to access your account
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-main-text"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="flex h-10 w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm text-main-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none text-main-text"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-secondary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="flex h-10 w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm text-main-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full flex h-10 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all"
              >
                Sign In
              </button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-bg px-2 text-text-muted">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="w-full text-smm flex h-10 items-center justify-center rounded-md border border-border bg-outline-border px-4 py-2 text-sm font-medium text-main-text hover:bg-secondary transition-colors"
              >
                <FaGoogle className="text-lg me-2" />
                Google
              </button>
              <button
                type="button"
                className="w-full flex h-10 items-center justify-center rounded-md border border-border bg-outline-border px-4 py-2 text-sm font-medium text-main-text hover:bg-secondary transition-colors"
              >
                <FaGithub className="text-lg me-2" />
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
