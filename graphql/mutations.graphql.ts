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

export const DISABLED_USER = gql`
  mutation ($id: uuid!, $metadata: jsonb) {
    updateUser(pk_columns: { id: $id }, _set: { metadata: $metadata }) {
      id,
      metadata
    }
  }
`

export const DELETE_POST = gql`
  mutation ($id: bigint!) {
    delete_post_by_pk(id:$id){
      id
    }
  }
`

export const CREATE_JOB = gql`
  mutation ($title: String!, $desc: String ) {
    insert_post_one(object:{ title: $title, desc: $desc }){
      id,
      title,
      desc,
      createdAt,
      user {
        displayName,
        avatarUrl,
        id
      }
    }
  }
`



