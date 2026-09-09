// অ্যাডমিন প্যানেলের GitHub লগইন — ধাপ ২: কোড বদলে টোকেন নিয়ে CMS-কে ফেরত দেওয়া
// (Vercel Serverless Function — Cloudflare-এর functions/callback.js-এর সমতুল্য)
module.exports = async (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const url = new URL(req.url, proto + '://' + host);
  const code = url.searchParams.get('code');

  let status;
  let payload;
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'bds-admin-auth',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await r.json();
    if (data.access_token) {
      status = 'success';
      payload = { token: data.access_token, provider: 'github' };
    } else {
      status = 'error';
      payload = data.error_description || data.error || 'token exchange failed';
    }
  } catch (e) {
    status = 'error';
    payload = String(e);
  }

  const msg = 'authorization:github:' + status + ':' + JSON.stringify(payload);
  const html = [
    '<!doctype html><html><body><p style="font-family:sans-serif">অনুমোদন সম্পন্ন — উইন্ডোটা বন্ধ হয়ে যাবে।</p><script>',
    '(function () {',
    '  function receiveMessage() {',
    '    window.opener.postMessage(' + JSON.stringify(msg) + ', "*");',
    '  }',
    '  window.addEventListener("message", receiveMessage, false);',
    '  window.opener.postMessage("authorizing:github", "*");',
    '})();',
    '</script></body></html>',
  ].join('\n');

  res.statusCode = 200;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(html);
};
