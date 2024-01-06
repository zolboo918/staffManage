import { gql, useQuery } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    allUsers {
      name
      id
      email
      phone
      gender
      address
    }
  }
`;

export const GET_ADMINS = gql`
  query GetAdmins {
    allAdmins {
      name
      id
      email
      phone
      gender
      address
    }
  }
`;

export const GET_USER = gql`
  query Query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
      password
    }
  }
`;
