module.exports = {
  distDir: 'build/_next',
  target: 'server',
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' hackney.gov.uk *.hackney.gov.uk;" +
              "object-src 'none';" +
              "connect-src 'self' www.google-analytics.com;" +
              "script-src-elem 'self' 'unsafe-inline' www.googletagmanager.com;" +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com;" +
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com;" +
              "font-src 'self' fonts.googleapis.com fonts.gstatic.com;" +
              "frame-ancestors 'self';" +
              "form-action 'self';",
          },
        ],
      },
    ];
  },
};
