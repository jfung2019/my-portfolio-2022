import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: "22zf6zhh",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-09"
})