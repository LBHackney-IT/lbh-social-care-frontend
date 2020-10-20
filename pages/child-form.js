import Head from 'next/head';
import { useRouter } from 'next/router';

const Child = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Child</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => router.back()}>Back</button>
      <div className="hero">
        <h1 className="title">Child Social Care Form</h1>
      </div>
    </div>
  );
};

export default Child;
