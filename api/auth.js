// অ্যাডমিন প্যানেলের GitHub লগইন — ধাপ ১: GitHub-এর অনুমোদন পাতায় পাঠানো
// (Vercel Serverless Function — Cloudflare-এর functions/auth.js-এর সমতুল্য)
module.exports = async (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const origin = proto + '://' + host;

  const redirect = new URL('https://github.com/login/oauth/authorize');
  redirect.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID || '');
  redirect.searchParams.set('redirect_uri', origin + '/callback');
  redirect.searchParams.set('scope', 'repo user');
  redirect.searchParams.set('state', Math.random().toString(36).slice(2) + Date.now().toString(36));

  res.statusCode = 302;
  res.setHeader('Location', redirect.toString());
  res.end();
};
