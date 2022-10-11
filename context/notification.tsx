import { useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { createContext } from "react";
import { GET_PEOPlE_TO_APPLIED, SUB_APPLIED_JOB } from "../graphql";
import { Element } from "../interfaces";
import toast from 'react-hot-toast';
import { Row, Text } from '@nextui-org/react';
import { useAppSelector } from "../hooks";

const NotificationContext = createContext({})

export const NotificationProvider = ({ children }: { children: Element }) => {

    const id = useUserId()
    const { postId } = useAppSelector(state => state.job)

    useSubscription(SUB_APPLIED_JOB, {
        variables: { id },
        onData: ({ client, data }) => {

            const idFromData = data.data.post_user[0]?.post[0].id || null
            const id = idFromData ? idFromData : postId

            const dataInStorage = client.readQuery<any>({ query: GET_PEOPlE_TO_APPLIED, variables: { id } }) || { post_user: [] }

            const isApplied = data.data.post_user.length > +dataInStorage.post_user.length

            if (isApplied) {

                toast.success(
                    <Text>
                        <Text color="secondary" b>{data.data.post_user[data.data.post_user.length - 1].userpost[0].displayName} </Text>
                        applied for
                        <Text color="primary" b> {data.data.post_user[data.data.post_user.length - 1].post[0].title}</Text>
                    </Text>
                    , { duration: 5000, icon: '〽️', style: { background: '#000' } })
            }


            client.writeQuery({
                query: GET_PEOPlE_TO_APPLIED,
                variables: {
                    id
                },
                data: {
                    ...data.data
                }
            })


        }
    })



    return (
        <NotificationContext.Provider
            value={{}}
        >
            {children}
        </NotificationContext.Provider>
    )
}