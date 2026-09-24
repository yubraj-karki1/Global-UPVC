# Global UPVC Windows & Prefab Homes

A full-stack marketing site for Global Hardware and Prefab Pvt. Ltd. The monorepo contains a Next.js frontend in `client` and an Express/Mongoose API in `server`.

## Project structure

```text
global-upvc/
├── client/                 # Next.js frontend
│   ├── app/                # App router pages and layouts
│   ├── components/         # UI components and dashboard
│   ├── lib/                # Product data and shared logic
│   ├── public/             # Static assets and images
│   ├── .env.example        # Client env example
│   ├── .env.local          # Local client env (not committed)
│   └── package.json
├── server/                 # Express API and Mongoose models
│   ├── src/                # App code, routes, middleware, services
│   ├── .env.example        # Server env example
│   ├── .env                # Local server env (not committed)
│   ├── Dockerfile
│   └── package.json
├── scripts/                # Local startup helpers
├── docker-compose.yml      # MongoDB + app orchestration
├── .env.example            # Root env template for shared values
├── package.json            # Root workspace scripts
├── README.md
├── .gitignore
├── server/.dockerignore
├── client/.dockerignore
└── node_modules/           # Installed dependencies
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
- Review keyboard focus, form labels, contrast and mobile layouts on real devices before launch. The site currently has an English interface; the navigation includes an initial Nepali label toggle, while full Nepali translation remains a content task.
- Online quotation/payment, customer accounts, SMS reminders, individual staff accounts and role permissions are not implemented. They need business process decisions and external provider configuration before they can be safely enabled.

## Production deployment

For a simple Docker-based deployment, run:

```bash
docker compose up --build -d
```

This starts:

- MongoDB on `localhost:27017`
- API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

For a hosted production build, set the same environment values in your server or PaaS settings and keep `ADMIN_PASSWORD` and `JWT_SECRET` private.
