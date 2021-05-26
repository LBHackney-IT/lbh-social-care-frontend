import type { GetServerSidePropsContext, GetServerSideProps } from 'next';

import { deleteSession } from 'utils/auth';

const Logout = (): null => null;

export const getServerSideProps: GetServerSideProps<Record<string, never>> =
  async ({ res }: GetServerSidePropsContext) => {
    deleteSession(res);
    return { props: {} };
  };

export default Logout;
