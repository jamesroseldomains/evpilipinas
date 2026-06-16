// EV Pilipinas Lead Capture — Cloudflare PAGES FUNCTION
// Location in repo:  functions/connect.js   → handles evpilipinas.com/connect

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
      background: #0a0a0a; color: #f0f0f0; min-height: 100vh;
      display: flex; flex-direction: column; align-items: center;
      justify-content: flex-start; padding: 24px 16px 48px;
    }
    .back { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px;
      color: #6b7280; text-decoration: none; font-size: 13px; font-weight: 600;
      margin-bottom: 24px; transition: color 0.2s; }
    .back:hover { color: #22c55e; }
    .back svg { width: 15px; height: 15px; stroke: currentColor; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .logo { font-size: 13px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #22c55e; margin-bottom: 8px; }
    h1 { font-size: 22px; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 8px; line-height: 1.3; }
    .sub { font-size: 14px; color: #9ca3af; text-align: center; margin-bottom: 28px; max-width: 360px; line-height: 1.5; }
    form { width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 14px; }
    label { font-size: 12px; font-weight: 600; color: #9ca3af; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px; display: block; }
    input, select, textarea { width: 100%; padding: 12px 14px; background: #1a1a1a; border: 1px solid #2d2d2d;
      border-radius: 8px; color: #f0f0f0; font-size: 15px; outline: none; transition: border-color 0.2s; -webkit-appearance: none; }
    input:focus, select:focus, textarea:focus { border-color: #22c55e; }
    textarea { resize: none; height: 80px; }
    .field { display: flex; flex-direction: column; }
    .optional { font-weight: 400; text-transform: none; letter-spacing: 0; color: #4b5563; font-size: 11px; }

    /* Car / Solar choice buttons */
    .choice { display: flex; gap: 10px; }
    .choice button {
      flex: 1; padding: 16px 12px; background: #1a1a1a; border: 1px solid #2d2d2d;
      border-radius: 10px; color: #9ca3af; font-size: 15px; font-weight: 600;
      cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column;
      align-items: center; gap: 8px; font-family: inherit;
    }
    .choice button svg { width: 26px; height: 26px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .choice button:hover { border-color: #3d3d3d; color: #d1d5db; }
    .choice button.active { border-color: #22c55e; color: #22c55e; background: #14241c; }

    /* conditional detail fields */
    .detail { display: none; }
    .detail.show { display: flex; flex-direction: column; animation: fade 0.25s ease; }
    @keyframes fade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

    .consent-row { display: flex; align-items: flex-start; gap: 12px; background: #1a1a1a; border: 1px solid #2d2d2d; border-radius: 8px; padding: 14px; cursor: pointer; }
    .consent-row input[type="checkbox"] { position: absolute; opacity: 0; width: 0; height: 0; }
    .checkmark {
      flex: none; width: 24px; height: 24px; border-radius: 6px;
      border: 2px solid #3d3d3d; background: #0f0f0f; position: relative;
      transition: all 0.15s ease; margin-top: 1px;
    }
    .checkmark::after {
      content: ''; position: absolute; left: 7px; top: 3px;
      width: 6px; height: 11px; border: solid #000; border-width: 0 3px 3px 0;
      transform: rotate(45deg) scale(0); transition: transform 0.15s ease;
    }
    .consent-row input[type="checkbox"]:checked + .checkmark {
      background: #22c55e; border-color: #22c55e;
    }
    .consent-row input[type="checkbox"]:checked + .checkmark::after {
      transform: rotate(45deg) scale(1);
    }
    .consent-row span { font-size: 13px; color: #9ca3af; line-height: 1.5; }
    button[type="submit"] { width: 100%; padding: 15px; background: #22c55e; color: #000; font-size: 15px; font-weight: 700;
      border: none; border-radius: 8px; cursor: pointer; letter-spacing: 0.02em; margin-top: 4px; transition: background 0.2s, transform 0.1s; }
    button[type="submit"]:disabled { background: #2d2d2d; color: #6b7280; cursor: not-allowed; }
    button[type="submit"]:not(:disabled):hover { background: #16a34a; }
    button[type="submit"]:not(:disabled):active { transform: scale(0.99); }
    .note { font-size: 12px; color: #4b5563; text-align: center; margin-top: 12px; line-height: 1.5; }
    .badge { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; margin-top: 20px; }
    .badge::before { content: '🔒'; font-size: 13px; }
  </style>
</head>
<body>
  <a class="back" href="https://evpilipinas.com">
    <svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg> Back to Home
  </a>
  <div class="logo">EV Pilipinas</div>
  <h1>Gusto mong bumili ng EV o mag-install ng Solar?</h1>
  <p class="sub">Ilagay ang iyong details at ikokonekta ka namin sa trusted dealer o installer. Free — walang pressure.</p>

  <form method="POST" action="/connect">
    <div class="field"><label for="name">Full Name</label>
      <input type="text" id="name" name="name" placeholder="Juan dela Cruz" required /></div>

    <div class="field"><label for="contact">Mobile Number</label>
      <input type="text" id="contact" name="contact" placeholder="09XX-XXX-XXXX" required /></div>

    <div class="field"><label for="email">Email Address <span class="optional">(optional)</span></label>
      <input type="email" id="email" name="email" placeholder="juan@email.com" /></div>

    <!-- Step 1: Car or Solar -->
    <div class="field">
      <label>What are you interested in?</label>
      <div class="choice">
        <button type="button" id="btn-car" onclick="pick('car')">
          <svg viewBox="0 0 24 24"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H4a1 1 0 0 1-1-1z"/></svg>
          EV / Car
        </button>
        <button type="button" id="btn-solar" onclick="pick('solar')">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          Solar
        </button>
      </div>
      <input type="hidden" id="category" name="category" required />
    </div>

    <!-- Step 2a: Car details -->
    <div class="field detail" id="detail-car">
      <label for="car_model">EV Brand &amp; Model</label>
      <input type="text" id="car_model" name="car_model" placeholder="e.g. BYD Atto 3, Tesla Model 3..." />
    </div>

    <!-- Step 2b: Solar details -->
    <div class="field detail" id="detail-solar">
      <label for="solar_kw">Preferred kW Setup</label>
      <input type="text" id="solar_kw" name="solar_kw" placeholder="e.g. 5kW with battery, 8kW hybrid..." />
    </div>

    <div class="field"><label for="area">Location / Preferred Dealer Area</label>
      <input type="text" id="area" name="area" placeholder="e.g. Quezon City, Laguna, Cebu..." required /></div>

    <div class="field"><label for="timeline">Timeline or Budget</label>
      <select id="timeline" name="timeline" required>
        <option value="" disabled selected>Kailan mo planong bumili?</option>
        <option value="ASAP - Within 1 month">ASAP — Within 1 month</option>
        <option value="1-3 months">1–3 months</option>
        <option value="3-6 months">3–6 months</option>
        <option value="Just researching">Just researching for now</option>
      </select></div>

    <div class="field"><label for="notes">Additional notes <span class="optional">(optional)</span></label>
      <textarea id="notes" name="notes" placeholder="Specific color, variant, questions, or solar budget..."></textarea></div>

    <label class="consent-row" for="consent">
      <input type="checkbox" id="consent" name="consent" required />
      <span class="checkmark"></span>
      <span>Pumapayag ako na makipag-ugnayan sa akin ang EV Pilipinas at ang aming trusted partners para sa aking inquiry. (I agree to be contacted.)</span>
    </label>

    <button type="submit" id="submitBtn" disabled>Send Inquiry →</button>
    <p class="note">Hindi ibebenta ang iyong info. For referral purposes lang — para makonekta ka sa tamang tao.</p>
  </form>

  <div class="badge">Your info is protected and never sold to third parties.</div>

  <script>
    function pick(type) {
      var btnCar = document.getElementById('btn-car');
      var btnSolar = document.getElementById('btn-solar');
      var detCar = document.getElementById('detail-car');
      var detSolar = document.getElementById('detail-solar');
      var carInput = document.getElementById('car_model');
      var solarInput = document.getElementById('solar_kw');

      document.getElementById('category').value = type;
      document.getElementById('submitBtn').disabled = false;

      if (type === 'car') {
        btnCar.classList.add('active'); btnSolar.classList.remove('active');
        detCar.classList.add('show'); detSolar.classList.remove('show');
        carInput.required = true; solarInput.required = false; solarInput.value = '';
      } else {
        btnSolar.classList.add('active'); btnCar.classList.remove('active');
        detSolar.classList.add('show'); detCar.classList.remove('show');
        solarInput.required = true; carInput.required = false; carInput.value = '';
      }
    }
  </script>
</body>
</html>`;

const THANK_YOU_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Received — EV Pilipinas</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #f0f0f0;
      min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; text-align: center; }
    .check { font-size: 56px; margin-bottom: 20px; }
    h1 { font-size: 24px; font-weight: 700; color: #22c55e; margin-bottom: 12px; }
    p { font-size: 15px; color: #9ca3af; max-width: 340px; line-height: 1.6; margin-bottom: 8px; }
    .back { display: inline-block; margin-top: 28px; padding: 12px 24px; background: #1a1a1a; border: 1px solid #2d2d2d;
      border-radius: 8px; color: #f0f0f0; font-size: 14px; text-decoration: none; transition: border-color 0.2s; }
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

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'GET') {
    return new Response(FORM_HTML, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  }

  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      const name     = formData.get('name')      || '';
      const contact  = formData.get('contact')   || '';
      const email    = formData.get('email')     || '';
      const category = formData.get('category')  || '';
      const carModel = formData.get('car_model') || '';
      const solarKw  = formData.get('solar_kw')  || '';
      const area     = formData.get('area')      || '';
      const timeline = formData.get('timeline')  || '';
      const notes    = formData.get('notes')     || '';
      const consent  = formData.get('consent')   ? 'Yes' : 'No';
      const ts       = new Date().toISOString();
      const replyTo  = email || 'no-reply@evpilipinas.com';

      // Build a readable "interest" line depending on category
      let interestLabel, interestDetail;
      if (category === 'solar') {
        interestLabel  = 'Solar';
        interestDetail = '☀️ Solar Setup: ' + (solarKw || 'not specified');
      } else {
        interestLabel  = 'EV / Car';
        interestDetail = '🚗 Brand & Model: ' + (carModel || 'not specified');
      }

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Lead — EV Pilipinas: ' + interestLabel,
          from_name: 'EV Pilipinas Lead Form',
          name: name,
          email: replyTo,
          message:
            '🧑 Name: '      + name    + '\n' +
            '📱 Mobile: '    + contact + '\n' +
            '📧 Email: '     + (email || 'not provided') + '\n' +
            '🏷 Category: '  + interestLabel + '\n' +
            interestDetail   + '\n' +
            '📍 Area: '      + area    + '\n' +
            '⏱ Timeline: '  + timeline + '\n' +
            '📝 Notes: '     + (notes || 'none') + '\n' +
            '✅ Consent: '   + consent + '\n' +
            '🕐 Time: '      + ts
        })
      });

      return new Response(THANK_YOU_HTML, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    } catch (err) {
      return new Response(THANK_YOU_HTML, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
