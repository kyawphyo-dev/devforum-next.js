import EditForm from "../../components/EditForm";
import { api } from "@/lib/api";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await api.users.getById(id);
  const user = data;

  return (
    <div className="my-15">
      <EditForm user={user} />
    </div>
  );
}

export default page;
