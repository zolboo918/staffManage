import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
      accessToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String, $password: String, $isAdmin: Boolean) {
    register(email: $email, password: $password, isAdmin: $isAdmin) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
    }
  }
`;

export const GET_RESET_PASSWORD_TOKEN_MUTATION = gql`
  mutation GetToken($email: String) {
    sendResetPasswordTokenEmail(email: $email) {
      id
    }
  }
`;

export const CHECK_RESET_PASSWORD_TOKEN_MUTATION = gql`
  mutation CheckToken($email: String, $token: String) {
    checkPasswordToken(email: $email, token: $token) {
      id
    }
  }
`;
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($email: String, $newPassword: String) {
    changePassword(email: $email, newPassword: $newPassword) {
      id
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation Query($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation Query($id: ID!, $user: UserUpdateInput!) {
    updateUser(id: $id, user: $user) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation Query($user: UserCreateInput!) {
    createUser(user: $user) {
      id
      name
      email
      phone
      address
      birthday
      gender
      isAdmin
    }
  }
`;
