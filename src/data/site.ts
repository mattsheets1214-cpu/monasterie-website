/**
 * Facts about Monasterie used in search-engine structured data (schema.org).
 * Only things stated on the site itself go here.
 */
const SITE = 'https://monasteriewatches.github.io/';

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE}#organization`,
  name: 'Monasterie Watch Company',
  alternateName: 'Monasterie',
  url: SITE,
  logo: `${SITE}brand/icon-512.png`,
  slogan: 'Conversatio Morum',
  description:
    'Monasterie Watch Company designs watches, from the timeless to the futuristic, in the spirit of the monks who improved the human experience.',
  founder: {
    '@type': 'Person',
    name: 'Matthew Sheets',
    jobTitle: 'Founder and designer',
  },
};

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE}#website`,
  name: 'Monasterie Watch Company',
  url: SITE,
  publisher: { '@id': `${SITE}#organization` },
};

export const SITE_URL = SITE;
