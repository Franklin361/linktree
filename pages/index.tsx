import { useQuery, useSubscription } from '@apollo/client';
import { Button, Grid, Row, Text } from '@nextui-org/react';
import { useUserId } from '@nhost/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { CardWorker, CardRecruiter, CustomAlert, CustomLoading, MainLayout, ModalCreateJob, ModalUsersApplied } from '../components';
import withAuth from '../components/withAuth';
import { GET_JOBS, GET_JOBS_BY_ID, SUB_JOBS } from '../graphql';
import { useAppDispatch, useAppSelector } from '../hooks';
import { JobState } from '../interfaces';
import { listJobs, openModal } from '../redux';

const Home: NextPage = () => {
  const { user } = useAppSelector(state => state.user)

  return (
    <MainLayout title='LinkTree | Home'>
      {
        user?.rol === 'recruiter'
          ? <RecruiterSection />
          : <WorkerSection />
      }
    </MainLayout>
  )
}

export default withAuth(Home)

export const WorkerSection = () => {

  const dispatch = useAppDispatch()
  const { data, loading, error } = useQuery<{ post: JobState[] }>(GET_JOBS)
  const { allJobs, appliedJobs } = useAppSelector(state => state.job)

  useEffect(() => {
    if (data?.post && !allJobs) dispatch(listJobs({ jobs: data.post, input: 'allJobs' }))
  }, [data])


  useSubscription(SUB_JOBS, {
    onData: ({ client, data }) => {

      client.writeQuery({
        query: GET_JOBS,
        data: {
          ...data.data
        }
      })

      dispatch(listJobs({ input: 'allJobs', jobs: data.data.post }))
    }
  })

  if (loading || !allJobs) return <CustomLoading msg='Loading jobs' />

  if (error && !data?.post) return <CustomAlert msg={error.message} />

  return (
    <>

      <Row justify='center' css={{ mb: '1em', flexDirection: 'column', alignItems: 'center' }}>
        <Text b size='$3xl'>
          Recent Jobs 👇
        </Text>
        <Text color='rgba(255,255,255,0.5)' css={{ textAlign: 'center' }}>
          These are some jobs that you can apply for it
        </Text>
      </Row>

      <Row>
        <Grid.Container gap={2} justify='center' lg >
          {
            allJobs.length === 0
              ? <Text>No Jobs</Text>
              : allJobs.map(job => (
                <Grid css={{ "@xsMax": { w: '90%' } }} key={job.id}><CardWorker {...job} /></Grid>
              ))
          }
        </Grid.Container>
      </Row>
    </>
  )
}

// TODO: refactor recruiter and worker section
export const RecruiterSection = () => {

  const dispatch = useAppDispatch()
  const handlerOpenModal = () => dispatch(openModal({ open: true, modal: 'create-job' }))

  const id = useUserId();
  const { data, loading, error } = useQuery<{ post: JobState[] }>(GET_JOBS_BY_ID, { variables: { id } })

  const { recruiterJobs } = useAppSelector(state => state.job)
  const { typeModal } = useAppSelector(state => state.ui)

  useEffect(() => {
    if (data?.post && !recruiterJobs) dispatch(listJobs({ jobs: data.post, input: 'recruiterJobs' }))
  }, [data])

  if (loading || !recruiterJobs) return <CustomLoading msg='Loading your jobs' />

  if (error && !data?.post) return <CustomAlert msg={error.message} />

  return (
    <>
      {typeModal === 'create-job' && <ModalCreateJob />}
      {typeModal === 'users-applied' && <ModalUsersApplied />}

      <Button onPress={handlerOpenModal} color='gradient' css={{
        position: 'fixed', zIndex: '$10', '@xsMax': { position: 'sticky', top: '6em', w: '100%', my: '2em' }
      }}>
        Create a job
      </Button>

      <Row justify='center' css={{ mb: '1em', flexDirection: 'column', alignItems: 'center' }}>
        <Text b size='$3xl'>
          Your Jobs 👇
        </Text>
        <Text color='rgba(255,255,255,0.5)' css={{ textAlign: 'center' }}>These are your own jobs, you can manage </Text>
      </Row>

      <Row>
        <Grid.Container gap={2} justify='center' lg >
          {
            recruiterJobs.length === 0
              ? <Text>No Jobs</Text>
              : recruiterJobs.map(job => (
                <Grid key={job.id}><CardRecruiter {...job} /></Grid>
              ))
          }
        </Grid.Container>
      </Row>
    </>
  )
}