import type { NextPage, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const env = process.env.NEXT_PUBLIC_APP_ENV || 'test';

  const robotsTxt =
    env !== 'production'
      ? `User-agent: *
Disallow: /`
      : `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Disallow: /api/
Disallow: /*?*

Sitemap: ${process.env.HOST}/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.write(robotsTxt);
  res.end();

  return {
    props: {}
  };
};

const RobotsTxt: NextPage = () => null;

export default RobotsTxt;
