/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "uk"],
  },
};

module.exports = nextConfig;
