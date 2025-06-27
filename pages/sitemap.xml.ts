import type { NextPage, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const env = process.env.NEXT_PUBLIC_APP_ENV || 'test';

  // 非生产环境返回空的 sitemap
  if (env !== 'production') {
    res.setHeader('Content-Type', 'application/xml');
    res.write(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
    );
    res.end();
    return {
      props: {}
    };
  }

  const baseUrl = process.env.OPENSOTRY_HOST || '';
  const locales = ['en-US', 'zh-CN'];
  const routes = [
    '',
    '/create'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${routes
        .map((route) =>
          locales
            .map(
              (locale) => `
                <url>
                  <loc>${baseUrl}/${locale}${route}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
                  <priority>${route === '' ? '1.0' : '0.8'}</priority>
                  ${locales
                    .map(
                      (alterLocale) => `
                    <xhtml:link 
                      rel="alternate" 
                      hreflang="${alterLocale}"
                      href="${baseUrl}/${alterLocale}${route}"
                    />`
                    )
                    .join('')}
                </url>
              `
            )
            .join('')
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

const Sitemap: NextPage = () => null;

export default Sitemap;
