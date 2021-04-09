module.exports = {
  testPathIgnorePatterns: ["business-finder/.next/", "business-finder/node_modules/"],
  setupFilesAfterEnv: ["business-finder/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "business-finder/node_modules/babel-jest",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
