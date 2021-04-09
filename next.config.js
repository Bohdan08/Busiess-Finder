module.exports = {
  env: {
    API_KEY:
      "SSHSOWA17uPwBUJcemHK8MsCtWYngWNY9Bad9B24WXGpxVrpQp1_7ohNFEGxZdbpEFJEHRiCcBSFNXuuxRsAtN1pCaDWxhtboD4IznuKjFRT1gbYiwjVz2oftm1uYHYx",
    // MAIN_END_POINT: "https://api.yelp.com/v3/businesses/search",
    MAIN_END_POINT: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search`,
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
