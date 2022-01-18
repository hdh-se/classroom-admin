import React from 'react';
import Head from 'next/head';

const SEO: React.FC<SEOProps> = ({}) => (
  <Head>
    <title>Classroom admin</title>
    <meta name="description" content="Classroom admin app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export interface SEOProps {}

SEO.defaultProps = {};

export default SEO;
