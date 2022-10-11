import { useQuery } from '@apollo/client';
import { Button, Grid, Row, Text } from '@nextui-org/react';
import { useUserId } from '@nhost/react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { CardWorker, CardRecruiter, CustomAlert, CustomLoading, MainLayout, ModalCreateJob } from '../components';
import withAuth from '../components/withAuth';
import { GET_JOBS, GET_JOBS_BY_ID } from '../graphql';
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
  const { jobs } = useAppSelector(state => state.job)

  useEffect(() => {
    if (data?.post && !jobs) dispatch(listJobs({ jobs: data.post }))
  }, [data])

  if (loading || !jobs) return <CustomLoading msg='Loading jobs' />

  if (error && !data?.post) return <CustomAlert msg={error.message} />

  return (
    <>
      <Row justify='center' css={{ mb: '1em' }}>
        <Text b size='$3xl' color='rgba(255,255,255,0.5)'>My Jobs</Text>
      </Row>

      <Row>
        <Grid.Container gap={2} justify='center' lg >
          {
            jobs.length === 0
              ? <Text>No Jobs</Text>
              : jobs.map(job => (
                <Grid key={job.id}><CardWorker {...job} /></Grid>
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
  const handlerOpenModal = () => dispatch(openModal(true))

  const id = useUserId();
  const { data, loading, error } = useQuery<{ post: JobState[] }>(GET_JOBS_BY_ID, { variables: { id } })

  const { jobs } = useAppSelector(state => state.job)

  useEffect(() => {
    if (data?.post && !jobs) dispatch(listJobs({ jobs: data.post }))
  }, [data])

  if (loading || !jobs) return <CustomLoading msg='Loading your jobs' />

  if (error && !data?.post) return <CustomAlert msg={error.message} />

  return (
    <>

      <ModalCreateJob />

      <Button onPress={handlerOpenModal} color='gradient' auto css={{ position: 'fixed', zIndex: '$10' }}>
        Create a job
      </Button>

      <Row justify='center' css={{ mb: '1em' }}>
        <Text b size='$3xl' color='rgba(255,255,255,0.5)'>My Jobs</Text>
      </Row>

      <Row>
        <Grid.Container gap={2} justify='center' lg >
          {
            jobs.length === 0
              ? <Text>No Jobs</Text>
              : jobs.map(job => (
                <Grid key={job.id}><CardRecruiter {...job} /></Grid>
              ))
          }
        </Grid.Container>
      </Row>
    </>
  )
}