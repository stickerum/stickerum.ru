/**
 * Document ready function wrapper
 *
 * @param {function} f
 */
const docReady = (f) => {
  return /in/.test(document.readyState) ? window.setTimeout(docReady, 9, f) : f();
};

/**
 * Main script
 */
const stickerum = (() => {
  /**
   * Define modules
   */
  const deeplinker = require('@codexteam/deeplinker');
  const instagram = require('./js/instagram');

  /**
   * Initial function
   */
  const init = () => {
    console.info('Stickerum is ready!');

    deeplinker.init();
    instagram.init();
  }

  /**
   * Start script when page is loaded
   */
  docReady(init);
})();

module.exports = stickerum;
