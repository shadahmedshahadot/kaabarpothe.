
---

## **USER Endpoints**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/auth/login` | POST | Authenticate a user and retrieve a token | Login with registered email and password |
| `/auth/register` | GET | Register a new user | Open the registration form or endpoint |

---

## **CATEGORY Endpoints**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/category` | POST | Create a new category | Include category name, subcategories, and an image |
| `/category` | GET | Retrieve all categories | List of all categories |
| `/category/:id` | GET | Retrieve details of a single category | Fetch category by its ID |
| `/category/:id` | PUT | Update a category by ID | Change subcategories or other properties |

> Replace `:id` with the actual category UUID.

---

## **BRAND Endpoints**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/brand` | POST | Create a new brand | Include brand name, description, and image |
| `/brand/:id` | PATCH | Update brand image | Upload a new brand image |
| `/brand/:id` | PATCH | Edit brand data | Update brand information such as description |
| `/brand` | GET | Retrieve all brands | List of all brands |
| `/brand/:id` | GET | Retrieve a single brand by ID | Fetch brand details by ID |

> Replace `:id` with the actual brand UUID.

---

## **PRODUCT Endpoints**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/products` | POST | Create a new product | Include product details, images, category and brand references |
| `/products` | GET | Retrieve all products | List of all products |
| `/products/:id` | GET | Retrieve a single product by ID | Fetch product details by its ID |

> Replace `:id` with the actual product UUID.

---

## **SPECIAL OFFER Endpoints**

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/special-offer` | GET | Create or retrieve special offers | Fetch all current offers or create a new one |

---

## Notes

- Replace `:id` in endpoints with the actual UUID of the resource.
- File uploads must be sent as **form-data**.
- Use the **Postman collection** for testing requests quickly.
- Responses are returned in **JSON format**, including success/failure messages.

---

## Example Usage

### Login
- **Description:** Authenticate a user.
- **Example:** Send POST request to `/auth/login` with email and password. You will receive an authentication token.

### Create Category
- **Description:** Add a new category with optional subcategories and an image.
- **Example:** Send POST request to `/category` with category name, subcategories, and file upload.

### Create Product
- **Description:** Add a new product with details, images, category, and brand references.
- **Example:** Send POST request to `/products` with product information and multiple images.

### Update Brand Image
- **Description:** Update the image for a brand.
- **Example:** Send PATCH request to `/brand/:id` with new image file.

### Get All Products
- **Description:** Retrieve all available products.
- **Example:** Send GET request to `/products` to fetch a list of all products.

---

This version is **clean, readable, and professional** for GitHub — no raw JSON is included, only clear descriptions and examples.

---

## Deploy to Vercel

This backend is an Express + Prisma app. Vercel runs it as a single Node serverless function via `api/index.ts`.

### 1. Files added for Vercel

- `vercel.json` — routes all traffic to `api/index.ts`.
- `api/index.ts` — exports the Express `app` (no `app.listen` on Vercel; the platform handles the HTTP layer).
- `package.json` scripts:
  - `vercel-build`: `prisma generate && tsc`
  - `postinstall`: `prisma generate` (ensures the Prisma client exists before the build runs)

### 2. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview + Development):

| Key | Notes |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Use the **pooled** Neon URL (`...-pooler...`). Serverless functions cannot hold persistent DB connections. |
| `BCRYPT_SALT_ROUNDS` | e.g. `10` |
| `JWT_ACCESS_TOKEN_SECRET` | rotate before deploy |
| `JWT_REFRESH_TOKEN_SECRET` | rotate before deploy |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | e.g. `7d` |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | e.g. `90d` |
| `STRIPE_SECRET_KEY` | rotate before deploy |
| `PUBLISH_KEY` | Stripe publishable key |
| `CLOUDINARY_CLOUD_NAME` | required for image upload |
| `CLOUDINARY_API_KEY` | required for image upload |
| `CLOUDINARY_API_SECRET` | required for image upload |
| `CORS_EXTRA_ORIGINS` | comma-separated extra frontend origins (optional) |

### 3. Project settings (Vercel dashboard)

- **Root Directory**: `hajj-umrah-backend` (this folder).
- **Framework Preset**: Other.
- **Build Command**: `pnpm vercel-build` (or leave blank — `vercel-build` script is auto-detected).
- **Install Command**: `pnpm install` (matches the existing `pnpm-lock.yaml`).
- **Output Directory**: leave blank.
- **Node.js Version**: 20.x or 22.x.

### 4. Deploy

```bash
# from repo root
cd hajj-umrah-backend
vercel            # link / first deploy
vercel --prod     # production deploy
```

Or push to the connected Git branch — Vercel auto-deploys.

### 5. Post-deploy

- Add the Vercel URL (e.g. `https://your-app.vercel.app`) to the frontend's `NEXT_PUBLIC_API_URL`.
- Add the frontend origin (e.g. `https://kaabarpothe.com`) to the CORS list in `src/app.ts` or via `CORS_EXTRA_ORIGINS`.
- Run migrations from your local machine against the production DB:
  ```bash
  DATABASE_URL="<prod-url>" pnpm prisma migrate deploy
  ```

### 6. Known limits / gotchas

- **No `app.listen` on Vercel.** Local dev still uses `src/server.ts` (`pnpm dev`); Vercel uses `api/index.ts`.
- **No local filesystem writes.** Multer must use Cloudinary storage (already configured). `/tmp` is the only writable path and is ephemeral.
- **Cold starts.** First request after idle is slow; pooled Neon URL is mandatory.
- **Request timeout.** Hobby plan = 10s, Pro = 60s. Long Stripe webhooks or migrations will time out.
- **Body size.** Vercel caps request body at 4.5 MB on Node functions, regardless of the `50mb` Express limit.
- **Stateless.** No in-memory sessions, caches, or rate-limiters. Use the DB or an external store.

