/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    appDir: true,             // <---- Comment and Uncomment this
  },
});