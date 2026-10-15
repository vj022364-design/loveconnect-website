LOVE CONNECT + RAZORPAY CHECKOUT (Hindi Setup)

1) Computer/server पर Node.js 18 या नया install करें.
2) इस folder में terminal खोलकर चलाएँ: npm install
3) .env.example की copy बनाकर उसका नाम .env रखें.
4) Razorpay Dashboard > Account & Settings/API Keys से TEST MODE की Key ID और Key Secret लें और .env में भरें. Secret key कभी HTML, GitHub या किसी chat में न डालें.
5) चलाएँ: npm start
6) Browser में http://localhost:3000 खोलें. Test mode में test payment करें.
7) Live payments के लिए Razorpay account verification/activation और live API keys की जरूरत होगी. पहले test mode में पूरा flow जाँचें.

IMPORTANT
- Server order बनाता है और payment signature server पर verify करता है.
- अभी user registration/login, database, membership expiry/renewal और verified payment को किसी specific user से जोड़ना implement नहीं है. इसलिए production website पर membership access को सुरक्षित रूप से enforce करने से पहले database + authenticated accounts जोड़ें.
- HTML का localStorage flag केवल browser UI demo है; इसे access security न मानें.
- Chat/voice/video buttons केवल demo text हैं; वास्तविक chat/calls implement नहीं हैं.
- Pexels images demo profiles के लिए हैं; इन्हें असली users की पहचान बताकर न दिखाएँ.
