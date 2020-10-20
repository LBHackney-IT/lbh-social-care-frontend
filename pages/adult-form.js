import Head from 'next/head';
import { useRouter } from 'next/router';

const Adult = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Adult</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => router.back()}>Back</button>
      <div className="hero">
        <h1 className="title">Adult Social Care Form</h1>
      </div>
    </div>
  );
};

export default Adult;
