import { useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { createContext } from "react";
import { GET_JOBS, GET_PEOPlE_TO_APPLIED, SUB_APPLIED_JOB, SUB_JOBS } from "../graphql";
import { Element } from "../interfaces";
import toast from 'react-hot-toast';
import { Row, Text } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from "../hooks";
import { listJobs } from "../redux";

const NotificationContext = createContext({})

export const NotificationProvider = ({ children }: { children: Element }) => {

    const id = useUserId()
    const { postId } = useAppSelector(state => state.job)
    const dispatch = useAppDispatch()

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

    useSubscription(SUB_JOBS, {
        onData: ({ client, data }) => {
            console.log(data.data.post)
            client.writeQuery({
                query: GET_JOBS,
                data: {
                    ...data.data
                }
            })
            dispatch(listJobs({ input: 'jobs', jobs: data.data.post }))
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