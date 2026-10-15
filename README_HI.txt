LOVE CONNECT — Razorpay setup (Hindi)

इस ZIP में:
- public/index.html: वेबसाइट; Login के पास से “Demo” शब्द हटाया गया है।
- server.js: Razorpay order बनाता है और payment signature verify करता है।
- package.json: Node.js dependencies
- .env.example: सुरक्षित environment variables का नमूना

सेटअप:
1. इस प्रोजेक्ट को Node.js hosting (जैसे Render) पर deploy करें। GitHub Pages पर server.js नहीं चल सकता।
2. Hosting के Environment Variables में:
   RAZORPAY_KEY_ID = आपकी Razorpay Live Key ID (rzp_live_...)
   RAZORPAY_KEY_SECRET = आपकी Live Key Secret
   PORT = 3000 (यदि hosting स्वयं PORT देती है, तो उसे बदलने की जरूरत नहीं)
3. npm install और npm start चलाएँ, या hosting के build/start settings में यही commands रखें।
4. Razorpay account live payments के लिए activated/verified होना चाहिए।
5. पहले छोटा, वास्तविक परीक्षण केवल अपनी वेबसाइट और Razorpay की शर्तों के अनुसार करें।

सुरक्षा:
- Secret Key को HTML, GitHub repository या chat में कभी न डालें।
- .env को repository में upload न करें।
- सिर्फ Login शीर्षक से Demo हटाया गया है। Login/account registration अभी वास्तविक रूप से implement नहीं है।
- यह checkout code payment signature verify करता है, लेकिन membership को user account/database से जोड़ना अभी बाकी है।
