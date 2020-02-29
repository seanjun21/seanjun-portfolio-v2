const contentful = require('contentful');
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const {
  ACCESS_TOKEN,
  SPACE_ID,
  ANALYTICS_ID,
  DETERMINISTIC,
  YOUTUBE_API_KEY,
} = process.env;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = entry => entry.sys.contentType.sys.id === 'about';

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Cabin', 'Open Sans'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-plugin-offline',
];

module.exports = client.getEntries().then(entries => {
  const {
    // mediumUser,
    // youtubeUser,
    devtoUser,
  } = entries.items.find(getAboutEntry).fields;

  plugins.push(
    // {
    //   resolve: 'gatsby-source-medium-fix',
    //   options: {
    //     username: mediumUser || '@medium',
    //   },
    // },
    {
      resolve: 'gatsby-source-dev',
      options: {
        username: devtoUser || '@devto',
      },
    },
    // {
    //   resolve: `gatsby-source-youtube-v2`,
    //   options: {
    //     channelId: [youtubeUser],
    //     apiKey: YOUTUBE_API_KEY,
    //   },
    // },
  );

  if (ANALYTICS_ID) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_ID,
      },
    });
  }

  return {
    siteMetadata: {
      isDevtoUserDefined: !!devtoUser,
      // isMediumUserDefined: !!mediumUser,
      // isYoutubeUserDefine: !!youtubeUser,
      deterministicBehaviour: !!DETERMINISTIC,
    },
    plugins,
  };
});
