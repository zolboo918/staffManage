"use client";
import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { User } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_ADMINS, GET_USERS } from "src/queries";
import UserListItem from "./UserListItem";

const roles = [
  {
    key: "user",
    text: "Хэрэглэгч",
    value: "user",
  },
  {
    key: "admin",
    text: "Админ",
    value: "admin",
  },
];

function UsersList() {
  const [role, setRole] = useState<
    string | number | boolean | (string | number | boolean)[] | undefined
  >();
  const admins = useQuery(GET_ADMINS, { fetchPolicy: "no-cache" });
  const users = useQuery(GET_USERS, { fetchPolicy: "no-cache" });

  return (
    <div className="mt-5 min-h-[50vh] max-h-[80vh] overflow-y-scroll	">
      <span>Дүр сонгох</span>
      <Dropdown
        placeholder="Сонгох"
        fluid
        selection
        options={roles}
        onChange={(_, { value }) => setRole(value)}
      />
      {role == "admin" ? (
        admins.data?.allAdmins?.map((admin: User) => (
          <UserListItem user={admin} />
        ))
      ) : role == "user" ? (
        users.data?.allUsers?.map((user: User) => <UserListItem user={user} />)
      ) : (
        <></>
      )}
    </div>
  );
}

export default UsersList;
