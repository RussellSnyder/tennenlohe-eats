import * as contentful from 'contentful';

const { CONTENTFUL_API_KEY, CONTENTFUL_SPACE_ID } = process.env

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID as string,
  accessToken: CONTENTFUL_API_KEY as string,
})

export async function fetchEntries() {
  const entries = await client.getEntries()
  if (entries.items) return entries.items
  console.log(`Error getting Entries`);
}

export default { fetchEntries }