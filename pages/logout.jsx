import { deleteSession } from 'utils/auth';

const Logout = () => null;

export const getServerSideProps = async ctx => {
  deleteSession(ctx);
  return { props: {} };
};

export default Logout;
