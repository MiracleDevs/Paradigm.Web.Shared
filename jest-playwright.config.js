module.exports = {
    browsers: ["chromium", "firefox", "webkit"],
    exitOnPageError: false, // GitHub currently throws errors
    collectCoverage: true,
    launchOptions: {
        headless: true,
    },
};
