"use client";

import { ApolloError, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, FormField } from "semantic-ui-react";
import { getFormattedDate } from "src/helper";
import {
  ADD_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from "src/mutations";
import { GET_USER } from "src/queries";
import { User, UserUpdateInput } from "../../../../types";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  gender: "",
};

const gender = [
  {
    key: "male",
    text: "Эр",
    value: "male",
  },
  {
    key: "female",
    text: "Эм",
    value: "female",
  },
  {
    key: "other",
    text: "Бусад",
    value: "other",
  },
];

function UserProfile({ params: { id } }: { params: { id: number } }) {
  const { data } = useQuery(GET_USER, {
    variables: { id },
    fetchPolicy: "no-cache",
  });
  const [user, setUser] = useState<User>(data?.user ? data.user : initialState);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [udpateUser] = useMutation(UPDATE_USER_MUTATION);
  const [addUser] = useMutation(ADD_USER_MUTATION);
  const route = useRouter();

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data]);

  const onPressDelete = () => {
    const isConfirmed = confirm("Та итгэлтэй байна уу?");
    if (isConfirmed) {
      deleteUser({ variables: { id } })
        .then((value) => {
          if (value.data) {
            alert("Амжилттай устлаа");
            route.replace("/users");
          }
        })
        .catch((error: ApolloError) => {
          alert(error.message);
        });
    }
  };
  const onPressSave = () => {
    if (data?.user) {
      const updateData: UserUpdateInput = {
        name: user.name,
        email: user.email,
        address: user.address,
        birthday: user.birthday,
        phone: user.phone,
        gender: user.gender,
        password: user.password,
        isAdmin: user.isAdmin,
      };
      udpateUser({
        variables: { id, user: updateData },
      })
        .then((value) => {
          if (value.data) {
            alert("Амжилттай хадгалагдлаа");
            route.replace("/users");
          }
        })
        .catch((error: ApolloError) => {
          alert(error.message);
        });
    } else {
      addUser({ variables: { user } })
        .then((value) => {
          if (value.data) {
            alert("Амжилттай хадгалагдлаа");
            route.replace("/users");
          }
        })
        .catch((error: ApolloError) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="max-h-fit w-[60%] self-center justify-self-center bg-white border-2 shadow-xl rounded-2xl p-14">
      <Link href={"/users"} className="border-2 rounded-xl p-2 ">
        {" "}
        &lt; Буцах{" "}
      </Link>
      <Form className="my-10">
        <FormField className="mt-4">
          <span className="text-grey-900">Нэр</span>
          <input
            value={user?.name}
            placeholder="нэр"
            className="text-black w-full "
            type="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, name: event.target.value })
            }
          />
        </FormField>
        <FormField className="mt-4">
          <span className="text-grey-900">Имэйл</span>
          <input
            value={user?.email}
            placeholder="email@gmail.com"
            className="text-black w-full "
            type="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, email: event.target.value })
            }
          />
        </FormField>
        <FormField className="mt-4">
          <span className="text-grey-900">Утас</span>
          <input
            value={user?.phone}
            placeholder="99999999"
            className="text-black w-full "
            type="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, phone: event.target.value })
            }
          />
        </FormField>
        <FormField className="mt-4">
          <span className="text-grey-900">Хаяг</span>
          <input
            value={user?.address}
            placeholder="Хаяг"
            className="text-black w-full "
            type="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, address: event.target.value })
            }
          />
        </FormField>
        <FormField className="mt-4">
          <span className="text-grey-900">Төрсөн өдөр</span>
          <input
            value={
              user?.birthday ? getFormattedDate(new Date(user?.birthday)) : ""
            }
            placeholder="1999-01-01"
            className="text-black w-full "
            type="date"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, birthday: new Date(event.target.value) })
            }
          />
        </FormField>
        <FormField className="mt-4">
          <span className="text-grey-900">Хүйс</span>
          <Dropdown
            placeholder="Сонгох"
            fluid
            selection
            options={gender}
            onChange={(_, { value }) =>
              setUser({ ...user, gender: value?.toString() })
            }
          />
        </FormField>
      </Form>
      <Button positive onClick={onPressSave}>
        Хадгалах
      </Button>
      {data?.user && (
        <Button negative onClick={onPressDelete}>
          Устгах
        </Button>
      )}
    </div>
  );
}

export default UserProfile;
