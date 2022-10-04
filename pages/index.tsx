import withAuth from '../components/withAuth';
import type { NextPage } from 'next'
import { MainLayout } from '../components';

const Home: NextPage = () => {

  return (
    <MainLayout title='LinkTree | Home'>

    </MainLayout>
  )
}

export default withAuth(Home)
