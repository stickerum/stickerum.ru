const instagramData = require('../data/instagram-photos.json');

/**
 * Add photos from instagram to wrapper
 */
module.exports = (() => {
  const init = (wrapperId = 'instagram-grid') => {
    let instagramPhotoBlock = document.getElementById(wrapperId);

    if (instagramPhotoBlock) {
      instagramData.data.forEach(item => {
        /**
         * Get data for an image
         */
        let link = item.link,
            src = item.imageUrl;

        /**
         * Create image-link element
         */
        let photoWrapper = document.createElement('a');

        photoWrapper.classList.add('instagram-grid__photo');

        /**
         * Set up link's params
         */
        photoWrapper.href = link;
        photoWrapper.target = '_blank';

        /**
         * Set photo as background image
         */
        photoWrapper.style.background = 'url(' + src + ') no-repeat center center';
        photoWrapper.style.backgroundSize = 'cover',

        /**
         * Add image block to wrapper
         */
        instagramPhotoBlock.appendChild(photoWrapper);
      });
    }
  }

  return {
    init
  }
})();
