const policy: CSPPolicy = {
  'connect-src': ["'self'", 'www.google-analytics.com', 'vc.hotjar.io'],
  'default-src': ["'self'"],
  'style-src': [
    "'self'",
    '{nonce}',
    "'sha256-2m+uPiNtvboYJ7hcptV7yA5rSTXALge6nT+HAcqYCXA='", // Inline styles from GTM
    "'unsafe-hashes'",
  ],
  'style-src-elem': [
    "'self'",
    '{nonce}',
    'fonts.googleapis.com',
    "'sha256-SvLgADqEePEV9RNxBrRQXSBJafFHcVNG7cPzHz6h9eA='", // HotJar inline style hash
  ],
  'script-src': ["'self'", '{nonce}'],
  'script-src-elem': [
    "'self'",
    '{nonce}',
    'www.googletagmanager.com',
    'script.hotjar.com',
    'static.hotjar.com',
  ],
  'font-src': ["'self'", 'fonts.gstatic.com'],
  'frame-src': ['vars.hotjar.com'],
  'img-src': ["'self'", 'script.hotjar.com'],
};

export type CSPDirective =
  | 'default-src'
  | 'connect-src'
  | 'style-src'
  | 'script-src'
  | 'font-src'
  | 'frame-src'
  | 'img-src'
  | 'style-src-elem'
  | 'script-src-elem';

export type CSPPolicy = {
  [key in CSPDirective]?: Array<string>;
};

export type CSPHeader = {
  [index in CSPDirective]?: Array<string>;
};

export const generateNonce = (): string =>
  new Array(5)
    .fill(null)
    .map(() => Math.random().toString(36).substring(2))
    .join('');

export const generateCSP = (nonce: string): string => {
  const header: CSPHeader = {};

  if (policy)
    Object.entries(policy).forEach(([directive, values]) => {
      if (isDirective(directive)) {
        header[directive] = (header[directive] || []).concat(
          values.map((d) => (d === '{nonce}' ? `'nonce-${nonce}'` : d))
        );
      }
    });

  return Object.entries(header)
    .map(
      ([directiveName, directiveValues]) =>
        directiveName + ' ' + directiveValues.join(' ')
    )
    .map((c) => `${c};`)
    .join(' ');
};

const isDirective = (input: unknown): input is CSPDirective =>
  [
    'default-src',
    'connect-src',
    'style-src',
    'script-src',
    'font-src',
    'frame-src',
    'img-src',
    'style-src-elem',
    'script-src-elem',
  ].includes(input as string);
