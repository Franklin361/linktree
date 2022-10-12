import { gql } from '@apollo/client';

export const SUB_APPLIED_JOB = gql`
subscription ($id: uuid!) {
  post_user( where:{ post: { user:{ id:{ _eq: $id } } }}){
    post{
      title,
      id
    },
    userpost{
      displayName,
      avatarUrl,
      metadata,
      email,
      id
    }
  }
}
`

export const SUB_JOBS = gql`
subscription {
  post {
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


