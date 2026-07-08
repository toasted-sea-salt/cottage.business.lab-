# The Cottage Business Lab - Launch Setup

This website is a static site. It can be hosted on Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any basic web host.

## Recommended Launch Path

1. Upload the full `cottage-business-lab` folder to your static host.
2. Point the domain to the host.
3. Create the Google Forms listed below.
4. Replace the blank URLs in `assets/js/site.js`.
5. Replace sample founder cards with real founder data as applications come in.

## Google Forms

Create three forms:

- `Client_Intake_Master`
- `Newsletter_Signup`
- `Donation_Pledge`

In `assets/js/site.js`, fill in:

```js
const FORM_LINKS = {
  intake: "https://docs.google.com/forms/d/e/YOUR_INTAKE_FORM/viewform",
  newsletter: "https://docs.google.com/forms/d/e/YOUR_NEWSLETTER_FORM/viewform",
  donation: "https://docs.google.com/forms/d/e/YOUR_DONATION_FORM/viewform"
};
```

If these URLs stay blank, the site falls back to email drafts addressed to `hello@thecottagebusinesslab.org`.

For actual money collection, connect the Donate page to a secure giving tool such as Donorbox, PayPal Giving Fund, Stripe Payment Links, Square, or Givebutter. The included `Donation_Pledge` form is a no-cost way to collect intent before a payment processor is ready.

## Virtual Farmers Market Sheet

If the board eventually needs to update without editing HTML, keep a Google Sheet with columns like:

- Business name
- Founder name
- Category
- City/state
- One-sentence pitch
- Support needed
- Website link
- Contact link
- Image/logo URL
- Approved for publishing

For a no-code directory, connect that Sheet to Softr, Awesome Table, Glide, or a published CSV workflow. The static HTML board included here is ready for launch with sample data and can be replaced later.

## Free Template PDFs

All public template links point to actual PDFs in:

`assets/pdfs/`

Current files:

- `one-page-business-plan.pdf`
- `product-pricing-worksheet.pdf`
- `brainstorming-mind-map.pdf`
- `market-research-snapshot.pdf`
- `founder-launch-checklist.pdf`

## Content Notes

The Texas Cottage Food Law article was reviewed against Texas Legislature Online on July 8, 2026. It links to SB 541 enrolled bill text and bill history. Review this article before public launch if the law or state guidance changes.
