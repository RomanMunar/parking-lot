const withTM = require("next-transpile-modules")(["consts"]);

module.exports = withTM({
  reactStrictMode: true,
});
