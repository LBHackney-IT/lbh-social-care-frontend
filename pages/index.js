import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { isAuthorised, redirectToLogin } from 'utils/auth';
import { NextSeo } from 'next-seo';
import AdminNavBar from 'components/AdminNavBar/AdminNavBar';

const Home = ({ userDetails }) => {
  const router = useRouter();
  return (
    <div>
      <NextSeo title="Home" />
      <AdminNavBar adminName={userDetails.name} />
      <div className="hero">
        <h1 className="title">Welcome!</h1>
        <button onClick={() => router.push('/adult-form')}>Adult Form</button>
        <button onClick={() => router.push('/child-form')}>Child Form</button>
      </div>
    </div>
  );
};

Home.propTypes = {
  userDetails: PropTypes.object
};

export const getServerSideProps = async ctx => {
  const user = isAuthorised(ctx);

  if (!user || !user.isAuthorised) {
    redirectToLogin(ctx);
  }

  return {
    props: {
      userDetails: user
    }
  };
};

export default Home;
