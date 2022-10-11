import { gql } from '@apollo/client';

export const SUB_APPLIED_JOB = gql`
subscription ($id: uuid!) {
  post_user( where:{ post: { user:{ id:{ _eq: $id } } }}){
    post{
      title
    }
  }
}
`