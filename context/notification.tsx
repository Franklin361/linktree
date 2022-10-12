import { useSubscription } from "@apollo/client";
import { Text } from '@nextui-org/react';
import { useUserId } from "@nhost/react";
import { createContext } from "react";
import toast from 'react-hot-toast';
import { GET_PEOPlE_TO_APPLIED, SUB_APPLIED_JOB } from "../graphql";
import { Element } from "../interfaces";

const NotificationContext = createContext({})

let times = 1

export const NotificationProvider = ({ children }: { children: Element }) => {


    const id = useUserId()

    useSubscription(SUB_APPLIED_JOB, {
        variables: { id },
        onData: ({ client, data }) => {

            const idFromData = data.data.post_user[data.data.post_user.length - 1]?.post[0].id || null

            const id = idFromData

            const dataInStorage = client.readQuery<any>({ query: GET_PEOPlE_TO_APPLIED, variables: { id } }) || { post_user: [] }

            const lengthDataStorage = +dataInStorage.post_user.length
            const lengthDataServer = data.data.post_user.length
            const isApplied = lengthDataServer > lengthDataStorage

            if (isApplied && times > 1) {

                toast.success(
                    <Text>
                        <Text color="secondary" b>{data.data.post_user[data.data.post_user.length - 1].userpost[0].displayName} </Text>
                        applied for
                        <Text color="primary" b> {data.data.post_user[data.data.post_user.length - 1].post[0].title}</Text>
                    </Text>
                    , { duration: 5000, icon: '〽️', style: { background: '#000' } })
            }
            times++
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