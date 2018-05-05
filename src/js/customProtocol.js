module.exports = (function () {
  /**
   * Open app by link with custom protocol or open fallback page with normal url
   *
   * @param {string} appLink link with custom protocol
   *                         "instagram://user?username=stickerum"
   * @param {string} link open this page if no app was registered this protocol
   *                      "https://www.instagram.com/stickerum/"
   */
  var openAppOrLink = function (appLink, link) {
    /**
     * Create pageHidden flag
     */
    var pageHidden = false;

    /**
     * Add "pagehide" listener to main window
     */
    window.addEventListener('pagehide', function () {
      pageHidden = true;
    }, false);

    /**
     * Add "blur" listener to main window
     */
    window.addEventListener('blur', function () {
      pageHidden = true;
    }, false);

    /**
     * Let's try to open link with custom protocol in the app
     */
    tryToOpenApp(appLink);

    /**
     * Check window's state in a 100 ms.
     * If window was not blurred or hidden then we need to open link.
     */
    setTimeout(function() {
      if (!pageHidden) {
        window.open(link, '_blank');
      }
    }, 50);
  }

  /**
   * Wrapper for openAppOrLink for clickable elements as div buttons
   *
   * @example
   * <div onclick="customProtocol.click(this)"
   *      data-link="https://www.instagram.com/stickerum/"
   *      data-app-link="instagram://user?username=stickerum">Open Instagram</div>
   *
   * @see openAppOrLink
   *
   * @param {object} element clickable element
   * @param {string} element.dataset.appLink link with custom protocol
   * @param {string} element.dataset.link fallback page link
   */
  var click = function (element) {
    var link = element.dataset.link;
    var appLink = element.dataset.appLink;

    openAppOrLink(appLink, link);
  }

  /**
   * Try to open app if it is possible
   *
   * // BUG: doent works on iPhone
   *
   * @example
   * <body onload="customProtocol.tryToOpenApp('instagram://user?username=stickerum')">
   *
   * @param {string} appLink link with custom protocol
   */
  var tryToOpenApp = function (appLink) {
      /**
       * Create a new iframe element for link with custom protocol
       */
      var iframeEl = document.createElement('iframe');
      iframeEl.style.display = 'none';
      document.body.appendChild(iframeEl);

      /**
       * If the iframe element exists then we are going to set appLink
       * as it's source. Let's try to open app by appLink's protocol
       */
      if (iframeEl !== null) {
        iframeEl.src = appLink;
      }
  }

  return {
    openAppOrLink: openAppOrLink,
    click: click,
    tryToOpenApp: tryToOpenApp
  }
})();
