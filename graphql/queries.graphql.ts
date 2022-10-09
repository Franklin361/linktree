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

// query {
//     post_user(where:{ user_id: { _eq: "166774a0-1fd8-4560-838f-e788352b4696" }}){
//       post{
//         title,
//         user{
//           displayName
//         }
//       }
//     }
//   }
