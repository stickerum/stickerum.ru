const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

/**
 * Load ACCESS_TOKEN from .env file
 */
require('dotenv').config()

/**
 * To get an Instagram access token follow these steps:
 *
 * 1. Create a new Instagram app on the page
 *    https://www.instagram.com/developer/clients/register/
 *
 *    Fill fields with any valid params and take a look on "redirect URIs" field:
 *    Valid redirect URIs: https://stickerum.ru
 *
 *    Enter here your site's address with protocol.
 *
 * 2. Pass your app's <CLIENT_ID> and <REDIRECT_URI> then open this URI
 *    https://www.instagram.com/oauth/authorize/?client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&response_type=token&scope=public_content
 *    You will be asked to login and give access to the app
 *
 *    You will be redirected to this page.
 *    https://stickerum.ru/#access_token=<ACCESS_TOKEN>
 *
 *    Here is your access token.
 */
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

/**
 * Save processed data to this file
 */
const outputFile = path.resolve(__dirname, '..', 'src', 'data', 'instagram-photos.json');

/**
 * Initial function
 */
const main = async ({ argv }) => {}

/**
 * Send API request to Instagram to get last medias
 */
const getMedia = () => {
  return rp({
    uri: 'https://api.instagram.com/v1/users/self/media/recent/',
    qs: {
      access_token: ACCESS_TOKEN,
      count: 9
    },
    json: true
  });
}

/**
 * Process response data from Instagram to our format
 */
const processData = (instagramData) => {
  let data = [];

  instagramData.data.forEach(item => {
    /**
     * Get data for an image
     */
    let link = item.link,
        src = item.images.low_resolution.url;

    data.push({
      link: link,
      imageUrl: src
    });
  });

  return data;
}

/**
 * Save processed data to file
 */
const saveToFile = async (data = {}) => {
  /**
   * Wrap <data> => {data: <data>}
   */
  data = {data}

  /**
   * Prepare pretty printed json object
   */
  let dataToPrint = JSON.stringify(data, null, 2);

  /**
   * Save data to file
   */
  await fs.writeFileSync(outputFile, dataToPrint);

  console.log(`JSON data saved to ${outputFile}`);
}

/**
 * Main process chain
 */
main(process)
.then(getMedia)
.then(processData)
.catch(err => {
  console.error(`Error while getting medias: ${err.message}.\n`);
})
.then(saveToFile)
.then(process.exit)
.catch(err => {
  console.error(err);
  process.exit(1)
})
