const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

/**
 * Load ACCESS_TOKEN from .env file
 */
require('dotenv').config()
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
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  });
}

/**
 * Process response data from Instagram to out format
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
const saveToFile = async (data) => {
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

  console.log('JSON data saved to %s', outputFile);
}

/**
 * Processes chain
 */
main(process)
.then(getMedia)
.then(processData)
.then(saveToFile)
.then(process.exit)
.catch(err => { console.error(err); process.exit(1) })
