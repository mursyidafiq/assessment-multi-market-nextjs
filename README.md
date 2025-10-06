Multi Market — Backend demo

What this is
- A small Next.js app demonstrating a multi-market backend where each market (e.g. MY, SG, AU)
   can reuse or extend feature documents (Header, Footer, Banner, How It Works).

Tech Stacks: Next.js, MongoDB, TailwindCSS

Quick start (5 minutes)
1. Requirements
    - Node 18+
    - MongoDB running locally (or a remote URI)

2. Install
```bash
npm install
```

3. Configure
Create a file named `.env.local` in the project root with at least:
```env
MONGODB_URI=mongodb://localhost:27017/multimarket
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run dev server
```bash
npm run dev
```

5. Seed demo data (optional, idempotent)
```bash
# POST to seed sample markets/features
curl -X POST http://localhost:3000/api/seed
```

Useful routes
- GET /api/markets
   - returns [{ code, name }, ...]
- GET /api/markets/{code}
   - returns { market: { code, name }, features: { header, footer, banner, howItWorks } }
   - features are resolved and merged according to reuse rules
- POST /api/markets
   - create or upsert a market (code, name, headerFrom, footerFrom, bannerFrom, howItWorksFrom)
- PATCH /api/markets
   - partial update of a market (provide code + fields to change)
- POST /api/media/upload
   - multipart/form-data upload, saves to public/media/uploads and returns { url }

Interactive docs
- Open the built-in API docs: http://localhost:3000/docs

How reuse and extension works (short)
- Each market document points to feature sources via fields like `headerFrom` or `howItWorksFrom`.
- Feature documents (Header, Footer, Banner, HowItWorks) live separately and may have `baseOf` to indicate they're a base for other markets.
- When serving a market, the server merges base → override so a derived market can change one field or extend an array (for example, add a `video` to a specific How It Works step) without replacing the entire feature.

Examples (curl)
- List markets
```bash
curl http://localhost:3000/api/markets
```
- Get a market with features
```bash
curl http://localhost:3000/api/markets/AU
```
- Create/upsert a market
```bash
curl -X POST -H "Content-Type: application/json" -d '{"code":"VN","name":"Vietnam","howItWorksFrom":"MY"}' http://localhost:3000/api/markets
```

Swagger API Docs
- The repo includes a small OpenAPI spec and a docs page (`/docs`).
