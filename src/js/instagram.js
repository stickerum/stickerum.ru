/**
 * Load JSON data with medias
 */
const instagramData = require('../data/instagram-photos.json');

/**
 * Return integer from 0 to target number
 *
 * @param {integer} number
 *
 * @return {integer}
 */
const rand = (number) => {
  return Math.floor(Math.random() * number);
}

/**
 * Generate random RGBA color string with a target alpha channel
 *
 * @param {integer} alpha
 *
 * @return {string}
 */
const generateColor = (alpha = 0.25) => {
  return `rgba(${rand(256)}, ${rand(256)}, ${rand(256)}, ${alpha}})`;
}

/**
 * Add photos from instagram to wrapper
 */
module.exports = (() => {
  /**
   * Append photos elements into the target wrapper
   *
   * @param {string} wrapperId
   */
  const init = (wrapperId = 'instagram-grid') => {
    let instagramPhotoBlock = document.getElementById(wrapperId);

    if (instagramPhotoBlock) {
      instagramData.data.forEach(item => {
        /**
         * Get data for an image
         */
        const
          link = item.link,
          src = item.imageUrl;

        /**
         * Create image-link element
         */
        let photoWrapper = document.createElement('a');

        /**
         * Add style class
         */
        photoWrapper.classList.add('instagram-grid__photo');

        /**
         * Set up link's params
         */
        photoWrapper.href = link;
        photoWrapper.target = '_blank';

        /**
         * Set photo as background image
         */
        photoWrapper.style.background = 'url(\"' + src + '\") no-repeat center center';
        photoWrapper.style.backgroundSize = 'cover';

        console.log(src);
        console.log(photoWrapper.style.background);

        /**
         * Generate random background color for tile while image not loaded
         */
        photoWrapper.style['background-color'] = generateColor();

        /**
         * Add image block to the wrapper
         */
        instagramPhotoBlock.appendChild(photoWrapper);
      });
    }
  }

  return {
    init
  }
})();
