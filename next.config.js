module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_API_KEY: process.env.CONTENTFUL_API_KEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_API_KEY: process.env.CONTENTFUL_API_KEY,
  },
}