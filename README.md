# AUREVO Coffee — Cloudflare Pages website

A one-page, responsive brand site for **AUREVO Coffee**, featuring **THE WORLD (Release 001)**, the existing scroll-controlled kettle / filter / cup animation, an image-based founders story, shop/order-interest flow, FAQ, and multi-column footer. **No checkout, customer database, or paid services** are required.

## FIRST: Set three links in `site-config.js`

Open `site-config.js` in a text editor and paste your actual values, preserving the quotation marks:

```js
window.AUREVO_CONFIG = {
  orderFormUrl: "https://forms.gle/REPLACE_WITH_YOUR_REAL_FORM_LINK",
  instagramUrl: "https://www.instagram.com/REPLACE_WITH_YOUR_REAL_HANDLE/",
  contactEmail: "REPLACE_WITH_YOUR_REAL_EMAIL"
};
```

The provided version leaves these blank **on purpose** because your real Google Form URL, Instagram handle, and email address were not supplied. The site's buttons display a tasteful “coming soon” dialog rather than sending visitors to nonexistent destinations. After you fill in the links, **Request a Bag** opens the real Google Form in a new tab, Instagram opens your Instagram, and Email opens the visitor's mail app. All “Shop Now” links scroll to the product's shop section.

## Make the Google order-interest form

Go to https://forms.google.com and create a blank Google Form. Suggested heading: **AUREVO — THE WORLD / Order Interest**. Suggested questions:

1. Name (required)
2. Email (required)
3. Country and delivery city / postal code (required)
4. Number of coffee bags you may want (required)
5. Notes or questions (optional)
6. Confirmation checkbox: “I understand this is an inquiry, not a confirmed order. AUREVO will contact me with availability, full pricing and shipping details before requesting payment.”

Make the form available to people outside your Google organization (in the form's publish/share settings). Copy its responder URL (usually `https://forms.gle/...`) into `orderFormUrl`. Test it yourself in a private window. **Do not collect card numbers or payment information through this form.** Review where you intend to ship and applicable food-labeling/business requirements before taking orders. If you collect contact information, provide an appropriate privacy notice explaining how you use it.

## Preview locally

This is a static site. You can open `index.html` directly or run:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000 . No Node, build system, database, or backend required. Web fonts load from Google Fonts.

## Publish at coffee.rohanmarar.com

1. Go to https://dash.cloudflare.com/ → **Workers & Pages** → create a **Pages** project using **Direct Upload**. Alternatively, use a GitHub-connected Pages project.
2. Upload the ZIP, or upload the **contents** of the extracted folder, so `index.html` is at the root of the deployment.
3. Test the `*.pages.dev` temporary address.
4. In the Pages project go to **Custom domains** → add `coffee.rohanmarar.com`. Let Cloudflare create/configure the DNS entry.
5. Test the custom domain on mobile and desktop. Updating the site later means deploying the modified files to the same Pages project.

If Cloudflare presents different menu labels, follow its current Pages direct-upload workflow. **Do not configure a Cloudflare Tunnel or your home server for this static site.**

## Edit the site

- **Links & contact:** `site-config.js`
- **Wording, sections & navigation:** `index.html`
- **Colors, styling and responsive behavior:** `styles.css` (`:root` is the theme)
- **Scroll brew animation and interactive behavior:** `script.js`
- **Official logo:** `assets/aurevo-official-logo.png` (the original coffee-cup “O” wordmark, with malformed old Japanese characters cropped away)
- **Product artwork:** `assets/the-world-label.webp` (from the AUREVO print label)
- **Founders' photos:** `assets/founders-together.webp`, `assets/samruddhi-coffee.webp`, `assets/rohan-outdoors.webp` (from photos you provided)

The copy intentionally makes **no unsupported claims** about certifications, charitable donations, existing customer reviews, shipping prices, or in-stock inventory. The product profile is marked provisional until the final roaster/supplier is confirmed. Replace draft story prose if you'd like to tell your more specific real-life founding story.

**Important:** This site is a brand presence and inquiry flow, not a legal or commercial authorization to operate a business. Launch selling activities only when your applicable immigration, food, and tax requirements are addressed.
