import Button from "@/components/Button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
function AuthForm() {
  return (
    <div className="flex space-x-2">
      <Button type="button" icon={FaGoogle} style="outline">
        Google
      </Button>
      <form
        action={async () => {
          "use server";
          console.log("server action active");
        }}
      >
        <Button type="button" icon={FaGithub} style="outline">
          Github
        </Button>
      </form>
    </div>
  );
}

export default AuthForm;
