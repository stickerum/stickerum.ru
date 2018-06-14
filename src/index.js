module.exports = (() => {
  /**
   * Load and init deeplinker module
   */
  require('@codexteam/deeplinker').init();

  /**
   * Fill wrapper for Instagram photos
   */
  require('./js/instagram').init();
})();
