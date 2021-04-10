module.exports = {
  env: {
    API_KEY:
      "SSHSOWA17uPwBUJcemHK8MsCtWYngWNY9Bad9B24WXGpxVrpQp1_7ohNFEGxZdbpEFJEHRiCcBSFNXuuxRsAtN1pCaDWxhtboD4IznuKjFRT1gbYiwjVz2oftm1uYHYx",
    // BUSINESS_SEARCH_ENDPOINT: "https://api.yelp.com/v3/businesses/search",
    BUSINESS_SEARCH_ENDPOINT: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
    AUTOCOMPLETE_ENDPOINT: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/autocomplete`
  },

  images: {
    domains: [
      "s3-media1.fl.yelpcdn.com",
      "s3-media2.fl.yelpcdn.com",
      "s3-media3.fl.yelpcdn.com",
      "s3-media4.fl.yelpcdn.com",
    ],
  },
};
