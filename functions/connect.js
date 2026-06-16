// EV Pilipinas Lead Capture Worker
// Deploy: Cloudflare Dashboard → Workers & Pages → Create Worker → paste this → Deploy

const WEB3FORMS_KEY = '2a706142-dd0a-4e0b-8729-87e12258fefb';

const FORM_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Connect with a Trusted Dealer — EV Pilipinas</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 24px 16px 48px;
    }

    .back {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #6b7280;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
      transition: color 0.2s;
    }
    .back:hover { color: #22c55e; }
    .back svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }

    .logo {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #22c55e;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .sub {
      font-size: 14px;
      color: #9ca3af;
      text-align: center;
      margin-bottom: 28px;
      max-width: 360px;
      line-height: 1.5;
    }

    form {
      width: 100%;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    label {
      font-size: 12px;
      font-weight: 600;
      color: #9ca3af;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 4px;
      display: block;
    }

    input, select, textarea {
      width: 100%;
      padding: 12px 14px;
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      color: #f0f0f0;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s;
      -webkit-appearance: none;
    }

    input:focus, select:focus, textarea:focus {
      border-color: #22c55e;
    }

    select option { background: #1a1a1a; }

    textarea { resize: none; height: 80px; }

    .field { display: flex; flex-direction: column; }

    .optional {
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      color: #4b5563;
      font-size: 11px;
    }

    .consent-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      padding: 14px;
    }

    .consent-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
      min-width: 18px;
      margin-top: 1px;
      accent-color: #22c55e;
      cursor: pointer;
      padding: 0;
    }

    .consent-row span {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.5;
    }

    button[type="submit"] {
      width: 100%;
      padding: 15px;
      background: #22c55e;
      color: #000;
      font-size: 15px;
      font-weight: 700;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      letter-spacing: 0.02em;
      margin-top: 4px;
      transition: background 0.2s, transform 0.1s;
    }

    button[type="submit"]:hover { background: #16a34a; }
    button[type="submit"]:active { transform: scale(0.99); }

    .note {
      font-size: 12px;
      color: #4b5563;
      text-align: center;
      margin-top: 12px;
      line-height: 1.5;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #6b7280;
      margin-top: 20px;
    }

    .badge::before { content: '🔒'; font-size: 13px; }
  </style>
</head>
<body>
  <a class="back" href="https://evpilipinas.com">
    <svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
    Back to Home
  </a>

  <div class="logo">EV Pilipinas</div>
  <h1>Gusto mong bumili ng EV o mag-install ng Solar?</h1>
  <p class="sub">Ilagay ang iyong details at ikokonekta ka namin sa trusted dealer o installer. Free — walang pressure.</p>

  <form method="POST" action="/connect">

    <div class="field">
      <label for="name">Full Name</label>
      <input type="text" id="name" name="name" placeholder="Juan dela Cruz" required />
    </div>

    <div class="field">
      <label for="contact">Mobile Number</label>
      <input type="text" id="contact" name="contact" placeholder="09XX-XXX-XXXX" required />
    </div>

    <div class="field">
      <label for="email">Email Address <span class="optional">(optional)</span></label>
      <input type="email" id="email" name="email" placeholder="juan@email.com" />
    </div>

    <div class="field">
      <label for="interest">What are you interested in?</label>
      <select id="interest" name="interest" required>
        <option value="" disabled selected>Pumili ng isa...</option>
        <optgroup label="BYD Models">
          <option value="BYD Atto 3">BYD Atto 3</option>
          <option value="BYD Seal">BYD Seal</option>
          <option value="BYD eMAX 7">BYD eMAX 7</option>
          <option value="BYD Dolphin">BYD Dolphin</option>
          <option value="BYD Sealion 6">BYD Sealion 6</option>
          <option value="Other BYD Model">Other BYD Model</option>
        </optgroup>
        <optgroup label="Other EV Brands">
          <option value="Other EV Brand">Other EV Brand (specify below)</option>
        </optgroup>
        <optgroup label="Solar">
          <option value="Home Solar Install">Home Solar Install</option>
          <option value="Solar + EV Charging Setup">Solar + EV Charging Setup</option>
        </optgroup>
      </select>
    </div>

    <div class="field">
      <label for="area">Location / Preferred Dealer Area</label>
      <input type="text" id="area" name="area" placeholder="e.g. Quezon City, Laguna, Cebu..." required />
    </div>

    <div class="field">
      <label for="timeline">Timeline or Budget</label>
      <select id="timeline" name="timeline" required>
        <option value="" disabled selected>Kailan mo planong bumili?</option>
        <option value="ASAP - Within 1 month">ASAP — Within 1 month</option>
        <option value="1-3 months">1–3 months</option>
        <option value="3-6 months">3–6 months</option>
        <option value="Just researching">Just researching for now</option>
      </select>
    </div>

    <div class="field">
      <label for="notes">Additional notes <span class="optional">(optional)</span></label>
      <textarea id="notes" name="notes" placeholder="Specific color, variant, questions, or solar budget..."></textarea>
    </div>

    <div class="consent-row">
      <input type="checkbox" id="consent" name="consent" required />
      <span>Pumapayag ako na makipag-ugnayan sa akin ang EV Pilipinas at ang aming trusted partners para sa aking inquiry. (I agree to be contacted.)</span>
    </div>

    <button type="submit">Ipadala ang aking inquiry →</button>

    <p class="note">Hindi ibebenta ang iyong info. For referral purposes lang — para makonekta ka sa tamang tao.</p>
  </form>

  <div class="badge">Your info is protected and never sold to third parties.</div>
</body>
</html>`;

const THANK_YOU_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Received — EV Pilipinas</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #f0f0f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      text-align: center;
    }
    .check { font-size: 56px; margin-bottom: 20px; }
    h1 { font-size: 24px; font-weight: 700; color: #22c55e; margin-bottom: 12px; }
    p { font-size: 15px; color: #9ca3af; max-width: 340px; line-height: 1.6; margin-bottom: 8px; }
    .back {
      display: inline-block;
      margin-top: 28px;
      padding: 12px 24px;
      background: #1a1a1a;
      border: 1px solid #2d2d2d;
      border-radius: 8px;
      color: #f0f0f0;
      font-size: 14px;
      text-decoration: none;
      transition: border-color 0.2s;
    }
    .back:hover { border-color: #22c55e; color: #22c55e; }
  </style>
</head>
<body>
  <div class="check">✅</div>
  <h1>Natanggap na!</h1>
  <p>Salamat sa iyong inquiry. Makikipag-ugnayan sa iyo ang aming trusted dealer o installer sa lalong madaling panahon.</p>
  <p>Para sa mas mabilis na tugon, maaari ka ring mag-message sa aming Facebook page.</p>
  <a class="back" href="https://evpilipinas.com">← Back to Home</a>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/connect') {
      return new Response('Not found', { status: 404 });
    }

    if (request.method === 'GET') {
      return new Response(FORM_HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    if (request.method === 'POST') {
      try {
        const formData = await request.formData();

        const name     = formData.get('name')     || '';
        const contact  = formData.get('contact')  || '';
        const email    = formData.get('email')    || '';
        const interest = formData.get('interest') || '';
        const area     = formData.get('area')     || '';
        const timeline = formData.get('timeline') || '';
        const notes    = formData.get('notes')    || '';
        const consent  = formData.get('consent')  ? 'Yes' : 'No';
        const ts       = new Date().toISOString();

        // Use email if provided, otherwise use a no-reply so Web3Forms still accepts it
        const replyTo = email || 'no-reply@evpilipinas.com';

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: 'New Lead — EV Pilipinas: ' + interest,
            from_name: 'EV Pilipinas Lead Form',
            name: name,
            email: replyTo,
            message:
              '🧑 Name: '      + name     + '\n' +
              '📱 Mobile: '    + contact  + '\n' +
              '📧 Email: '     + (email || 'not provided') + '\n' +
              '🚗 Interest: '  + interest + '\n' +
              '📍 Area: '      + area     + '\n' +
              '⏱ Timeline: '  + timeline + '\n' +
              '📝 Notes: '     + (notes || 'none') + '\n' +
              '✅ Consent: '   + consent  + '\n' +
              '🕐 Time: '      + ts
          })
        });

        return new Response(THANK_YOU_HTML, {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' }
        });

      } catch (err) {
        console.error('Lead form error:', err);
        return new Response(THANK_YOU_HTML, {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' }
        });
      }
    }

    return new Response('Method not allowed', { status: 405 });
  }
};
