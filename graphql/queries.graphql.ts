import { gql } from '@apollo/client';


export const GET_JOBS_BY_ID = gql`
query($id: uuid!) {
    post (where:{ userId:{ _eq: $id }}){
        id,
        title,
        desc,
        createdAt,
        user {
            displayName,
            avatarUrl,
            id
        }
    },
} 
`

export const GET_JOBS = gql`
query {
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

export const GET_JOBS_APPLIES_BY_USER = gql`
query($id: uuid!) {
    post_user(where:{ user_id: { _eq: $id }}){
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
} 
`

export const GET_PEOPlE_TO_APPLIED = gql`
query($id: bigint!) {
  post_user(where:{ post_id: { _eq: $id  } }){
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

