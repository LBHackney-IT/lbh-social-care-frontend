import Head from 'next/head';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero">
        <h1 className="title">Welcome!</h1>
        <button onClick={() => router.push('/adult-form')}>Adult Form</button>
        <button onClick={() => router.push('/child-form')}>Child Form</button>
      </div>
    </div>
  );
};

export default Home;
