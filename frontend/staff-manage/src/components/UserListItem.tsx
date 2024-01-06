import { useRouter } from "next/navigation";
import { Button } from "semantic-ui-react";
import { getFormatDateAndTime } from "src/helper";
import { UserListItemProps } from "../../types";

function UserListItem(props: UserListItemProps) {
  const {
    user: { id, email, name, phone, address, birthday, gender },
  } = props;
  const route = useRouter();

  const onPressEdit = () => {
    route.push(`/users/${id}`);
  };

  return (
    <div className="border-slate-100 border-2 my-3 p-2 rounded-xl text-gray-700">
      <p>Нэр: {name}</p>
      <p>Имэйл: {email}</p>
      <p>Утас: {phone}</p>
      <p>Хаяг: {address}</p>
      {birthday && <p>Төрсөн өдөр: {getFormatDateAndTime(birthday)}</p>}
      <p>Хүйс: {gender}</p>
      <Button positive onClick={onPressEdit}>
        Засах
      </Button>
    </div>
  );
}

export default UserListItem;
