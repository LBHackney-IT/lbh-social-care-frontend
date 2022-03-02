import { generateCSP, generateNonce } from './contentSecurity';

beforeAll(() => jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789));
afterAll(() => jest.spyOn(global.Math, 'random').mockRestore());

describe('generating a nonce value', () => {
  test('creates a random string', () => {
    expect(generateNonce()).toBe(
      '4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx'
    );
  });
});

describe('generating the desired CSP from a nonce', () => {
  test('generates the expected CSP header', () => {
    expect(generateCSP(generateNonce())).toBe(
      `connect-src 'self' www.google-analytics.com vc.hotjar.io in.hotjar.com o183917.ingest.sentry.io ${process.env.NEXT_PUBLIC_CORE_PATHWAY_APP_URL}; ` +
        "default-src 'self'; " +
        "style-src 'self' 'nonce-4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx' fonts.googleapis.com 'sha256-2m+uPiNtvboYJ7hcptV7yA5rSTXALge6nT+HAcqYCXA=' 'unsafe-hashes'; " +
        "style-src-elem 'self' 'nonce-4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx' fonts.googleapis.com 'sha256-SvLgADqEePEV9RNxBrRQXSBJafFHcVNG7cPzHz6h9eA=' 'sha256-TGjSkcFoVCRdq4Hp3hcETnPc9cikdBGvkz/08Bjzy0I='; " +
        "script-src 'self' 'nonce-4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx'; " +
        "script-src-elem 'self' 'nonce-4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx4fzzzxjylrx' www.googletagmanager.com script.hotjar.com static.hotjar.com; " +
        "font-src 'self' fonts.gstatic.com; " +
        'frame-src vars.hotjar.com; ' +
        "img-src 'self' script.hotjar.com www.googletagmanager.com maps.googleapis.com; " +
        "frame-ancestors 'self'; " +
        "form-action 'self';"
    );
  });
});
