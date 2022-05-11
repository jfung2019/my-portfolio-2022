import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID_DEVELOPMENT,
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-09"
})