import Link from "next/link";
import UsersList from "src/components/UsersList";

async function Users() {
  return (
    <div className="w-[60%] self-center justify-self-center bg-white border-2 shadow-xl rounded-2xl p-14">
      <div className="flex row justify-between">
        <span className="text-gray-900 text-xl">Хэрэглэгчдийн жагсаалт</span>
        <Link href={"/users/add"}>Нэмэх</Link>
      </div>
      <UsersList />
    </div>
  );
}

export default Users;
