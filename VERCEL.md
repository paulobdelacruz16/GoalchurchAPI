# Deploying to Vercel

This repository is an Express API deployed as a Vercel Node.js function.

## Vercel project settings

Use the repository root as the project root. Vercel detects `api/index.js` as the serverless function entrypoint. No build command is required.

Configure these environment variables in the Vercel project settings:

- `MONGO_URL`: the MongoDB Atlas connection string.
- `CORS_ORIGIN`: the deployed frontend origin, such as `https://example.com`. Multiple origins may be separated by commas.

The local `.env` file is ignored by Git and must not be uploaded. Rotate any MongoDB credentials that have previously been exposed in that file before adding the replacement value to Vercel.

## Deploy

From the repository root, install the Vercel CLI if necessary and run:

```bash
npx vercel
```

For production deployment:

```bash
npx vercel --prod
```

After deployment, test the root URL and an API endpoint such as `/api/home`.