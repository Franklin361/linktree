import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {
      id
      displayName
      metadata
    }
  }
`

export const UPDATE_USER_AVATAR = gql`
  mutation ($id: uuid!, $avatarUrl: String!) {
    updateUser(pk_columns: { id: $id }, _set: { avatarUrl: $avatarUrl }) {
      id
    }
  }
`