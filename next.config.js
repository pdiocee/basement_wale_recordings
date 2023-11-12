// IMPORTANT - comment out "output: 'export'," whenever you want to start a local server (localhost). if already commented out, leave it alone and go about your business - Pritam

/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true,
  },
  serverless: true,
}

module.exports = nextConfig;
