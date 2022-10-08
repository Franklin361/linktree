import { Button, Card, Row, Text, User, Container, Grid } from '@nextui-org/react';
import type { NextPage } from 'next';
import { CardJob, CustomLoading, LoadingFullScreen, MainLayout, ModalCreateJob } from '../components';
import withAuth from '../components/withAuth';
import { useAppDispatch, useAppSelector } from '../hooks';
import { listJobs, openModal } from '../redux';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../graphql';
import { JobState } from '../interfaces';

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const handlerOpenModal = () => dispatch(openModal(true))

  const { data, loading, error } = useQuery<{ post: JobState[] }>(GET_JOBS)
  const { jobs } = useAppSelector(state => state.job)

  useEffect(() => {
    if (data?.post && !jobs) dispatch(listJobs(data.post))
  }, [data])

  if (loading || !jobs) {
    return <MainLayout title='LinkTree | Home'>
      <CustomLoading msg='Loading your jobs' />
    </MainLayout>
  }

  if (error && !data?.post) {
    return <MainLayout title='LinkTree | Home'>
      <Card css={{ w: 'fit-content', m: 'auto', px: '1em', bg: '$error' }}>
        <Card.Body>
          <Text b size='$lg'>Ups!, it was an error, please refresh the window</Text>
          <Text size='$md'>{error?.message}</Text>
        </Card.Body>
      </Card>
    </MainLayout>
  }

  return (
    <MainLayout title='LinkTree | Home'>

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
                <Grid><CardJob key={job.id} {...job} isOwn /></Grid>
              ))
          }
        </Grid.Container>
      </Row>
    </MainLayout>
  )
}

export default withAuth(Home)


export const Jobs = () => {
  return (
    <>

      <Row justify='center' css={{ mb: '1em' }}>
        <Text b size='$3xl' color='secondary'>Recent Jobs</Text>
      </Row>
      {/* <CardJob /> */}
    </>
  )
}