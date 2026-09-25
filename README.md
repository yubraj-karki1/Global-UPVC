# Global UPVC Windows & Prefab Homes

A full-stack marketing site for Global Hardware and Prefab Pvt. Ltd. The npm workspace contains a Next.js frontend in `client` and an Express/Mongoose API in `server`.

## Project structure

```text
global-upvc/
├── client/                         # Next.js website
│   ├── app/                        # Routes, layouts and global styles
│   ├── components/                 # Shared UI components
│   ├── lib/                        # Product data and helpers
│   ├── public/images/              # Static image assets
│   ├── .env.example                # Client environment template
│   ├── Dockerfile
│   └── package.json
├── server/                         # Express API
│   ├── src/
│   │   ├── middleware/             # Authentication and rate limiting
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API endpoints
│   │   ├── services/               # Notifications and integrations
│   │   ├── app.ts                  # Express app configuration
│   │   ├── config.ts               # Environment validation
│   │   └── index.ts                # API entry point
│   ├── .env.example                # Server environment template
│   ├── Dockerfile
│   └── package.json
├── scripts/                        # Local start helpers
├── .env.example                    # Root environment template
├── docker-compose.yml              # MongoDB and app services
├── package.json                    # npm workspaces and shared commands
├── package-lock.json
└── README.md
```

## Local setup

Requirements: Node.js 20+, npm, and either Docker, local MongoDB, or a MongoDB Atlas connection string.

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Copy `server/.env.example` to `server/.env`. Keep the local MongoDB URI, or replace it with your Atlas URI. Never commit this file.

3. Copy `client/.env.example` to `client/.env.local`. Change `NEXT_PUBLIC_API_URL` if the API is not on port 5000.

4. Start MongoDB. With Docker Desktop running, the included Compose file is the quickest option:

   ```bash
   docker compose up -d mongodb
   ```

5. Run both apps:

   ```bash
   npm run dev
   ```

The website runs at `http://localhost:3000`; the API runs at `http://localhost:5000`. Check it at `GET /api/health`. Enquiries are accepted at `POST /api/enquiries`.

## Admin dashboard

Open `http://localhost:3000/admin` and sign in with the credentials configured in `server/.env`. The dashboard can search enquiries, filter by status, mark an enquiry as new/contacted/archived, call a customer, and delete an enquiry.

The admin API uses an eight-hour signed bearer token. `GET /api/enquiries`, `PATCH /api/enquiries/:id`, and `DELETE /api/enquiries/:id` all require that token. Set a long unique `ADMIN_PASSWORD` and a random `JWT_SECRET` in every deployed environment; never commit them.

## Production notes

- Confirm the public phone numbers and Gwarko location in `client/app/page.tsx` before launch. No public business email was found, so the site intentionally uses phone, social links, and the enquiry form instead.
- Set `NEXT_PUBLIC_API_URL`, `MONGODB_URI`, and `PORT` in your host's environment settings.
- Restrict CORS to the production website origin.
- Build everything with `npm run build` or check TypeScript with `npm run typecheck`.

## Lead operations and launch checklist

- New enquiry alerts are sent to `ENQUIRY_NOTIFICATION_WEBHOOK_URL` as a JSON POST. Configure an HTTPS endpoint in your automation/email provider and test a submission. Delivery failures are logged by the API; the enquiry is still saved in MongoDB.
- The admin dashboard supports staff assignment, follow-up dates and an activity history. Assignments are currently free-text names; configure staff names with the team and use consistent spelling.
- Set `NEXT_PUBLIC_GA_ID` in the client deployment to enable Google Analytics. Track form submissions in your analytics property before relying on campaign reports.
- Configure MongoDB Atlas automated backups or a scheduled `mongodump` to private, access-controlled storage. Periodically verify a restore; the app does not create backups itself.
- Use HTTPS, restrict `ALLOWED_ORIGINS`, use unique production credentials, and configure host-level error monitoring and uptime alerts. `GET /api/health` is available for uptime checks.
- Add real project photos only with customer permission. Replace the portfolio placeholders with verified work and add review links only after confirming the correct business profile URL. Do not publish invented testimonials, warranty promises or service coverage.
- Review keyboard focus, form labels, contrast and mobile layouts on real devices before launch. The current site is English-only; publish a complete reviewed Nepali translation before advertising Nepali-language support.
- Online quotation/payment, customer accounts, SMS reminders, individual staff accounts and role permissions are not implemented. They need business process decisions and external provider configuration before they can be safely enabled.

## Production deployment

For a simple Docker-based deployment, run:

```bash
docker compose up --build -d
```

This starts MongoDB on `localhost:27017`, the API on `http://localhost:5000`, and the frontend on `http://localhost:3000`. The defaults are for local use. For a public deployment, set these variables before building:

```env
NEXT_PUBLIC_SITE_URL=https://www.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
ALLOWED_ORIGINS=https://www.example.com
```

`NEXT_PUBLIC_API_URL` is embedded in the frontend at image build time, so provide it when running `docker compose build` (for example, through a root `.env` file). `ALLOWED_ORIGINS`, `TRUST_PROXY`, and `TRUST_PROXY_HOPS` are read by the API at runtime. Use the exact trusted proxy hop count for your hosting setup. Put the site and API behind HTTPS reverse proxies, and do not expose the MongoDB port publicly.

For a hosted production build, set the same environment values in your server or PaaS settings and keep `ADMIN_PASSWORD` and `JWT_SECRET` private.
