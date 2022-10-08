import { gql } from '@apollo/client';


export const GET_JOBS = gql`
query{
    post{
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