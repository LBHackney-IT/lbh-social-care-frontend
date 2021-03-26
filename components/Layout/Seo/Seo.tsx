import Head from 'next/head';

interface Props {
  title: string;
}

const Seo = ({ title }: Props): React.ReactElement => (
  <Head>
    <title>{title} - Social Care Admin - Hackney Council</title>
  </Head>
);

export default Seo;
