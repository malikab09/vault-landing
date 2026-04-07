export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer re_JiUo9ZhL_2ceisGr22eGFaegfJS75jDU5',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'hello@heirlo.app',
      to: 'hello@heirlo.app',
      subject: 'New Waitlist Signup',
      text: `New signup: ${email}`,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    return res.status(500).json({ error: 'Failed to send email', details: data });
  }

  return res.status(200).json({ success: true });
}
