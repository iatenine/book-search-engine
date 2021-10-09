import { gql } from "@apollo/client";

export const QUERIES = gql`
    query GET_ME{
        me{
            username
        }
    `;
