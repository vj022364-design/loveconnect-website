require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, PORT = 3000 } = process.env;
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env before accepting payments.');
}
const razorpay = (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET)
  ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET }) : null;

app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpay) return res.status(503).json({ error: 'Razorpay keys सेट करें; payment अभी configured नहीं है।' });
    const order = await razorpay.orders.create({
      amount: 29900, currency: 'INR', receipt: 'lc_' + Date.now(),
      notes: { product: 'LoveConnect 6 Months Membership' }
    });
    res.json({ id: order.id, amount: order.amount, currency: order.currency, keyId: RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('Create order failed:', err.message);
    res.status(500).json({ error: 'Razorpay order नहीं बन पाया। Dashboard keys और account status जाँचें।' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    if (!RAZORPAY_KEY_SECRET) return res.status(503).json({ error: 'Razorpay server keys configured नहीं हैं।' });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ verified: false, error: 'Payment response अधूरा है।' });
    const expected = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const a = Buffer.from(expected, 'hex'); const b = Buffer.from(razorpay_signature, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b))
      return res.status(400).json({ verified: false, error: 'Signature verification failed.' });
    // Production note: persist payment and membership against an authenticated user in a database.
    // This demo verifies the signature but does not yet maintain user accounts or renewal/expiry records.
    return res.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('Verification error:', err.message);
    return res.status(500).json({ verified: false, error: 'Payment verification failed.' });
  }
});

app.listen(PORT, () => console.log(`LoveConnect running at http://localhost:${PORT}`));
