import { GetServerSideProps } from 'next';

interface Props {
  header: string;
}

const ErrorThrowingPage = ({ header }: Props): React.ReactElement => {
  return (
    <>
      <h1>{header}</h1>

      <button
        onClick={() => {
          throw new Error('ErrorThrowingPage component error');
        }}
      >
        throw frontend error
      </button>

      <a href="/throw-error?server=true">throw server error</a>

      <button
        onClick={() => {
          fetch('/api/throw-error', {}).catch((e) => {
            console.log(e);
          });
        }}
      >
        throw api error
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.server) {
    throw new Error('ErrorThrowingPage getServerSideProps error');
  }

  return {
    props: {
      header: 'This page throws errors for testing purposes.',
    },
  };
};

export default ErrorThrowingPage;
