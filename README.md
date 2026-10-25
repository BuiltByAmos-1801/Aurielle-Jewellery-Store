# Aurielle Jewellery Store — React + Vite

A responsive jewellery storefront demo created for portfolio/client demonstrations.

## Run locally
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP and open the `aurielle-jewellery-store` folder in VS Code.
3. Open a terminal in that folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite (usually http://localhost:5173).

## Included
- Responsive premium jewellery storefront
- Product categories and product details modal
- Wishlist toggle
- Shopping bag with quantity controls and subtotal
- WhatsApp enquiry checkout
- Newsletter interaction UI
- Story/editorial sections and mobile navigation
- Tailwind CSS + custom responsive styling

## Before using for a real client
- In `src/App.jsx`, replace `919999999999` in the `checkout()` function with the business's WhatsApp number (country code + number, digits only).
- Replace sample products, prices, policies and brand details with the client's actual information.
- Product photography is loaded from Unsplash and requires internet access.
- Newsletter is front-end demo only; connect an email marketing service/backend to collect subscriptions.
- This is a demo storefront; it does not process payments or store orders.

## Build / deploy
Run `npm run build`. Upload the generated `dist` folder to Netlify or Vercel, or connect the project repository to either platform.

Built by Built By Amos.
