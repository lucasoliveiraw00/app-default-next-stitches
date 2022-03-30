/** @type {import('next').NextConfig} */
const ENV = process.env;

const {
  APP_ENVIRONMENT,
  APP_API_BASE_URL_DASHBOARD,
  APP_SENTRY_DSN,
  NEXT_IMAGES_DOMAINS,
  AUTH_APP_URL,
  AUTH_COOKIE_PASSWORD,
} = ENV;

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    APP_ENVIRONMENT,
    APP_API_BASE_URL_DASHBOARD,
    APP_SENTRY_DSN,
    AUTH_APP_URL,
    AUTH_COOKIE_PASSWORD,
  },
  images: {
    domains: NEXT_IMAGES_DOMAINS?.split(',') ?? [],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
