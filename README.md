This is a retro tool front-end application.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Docker Container

Next.js can be deployed to any hosting provider that supports Docker containers. You can use this approach when deploying to container orchestrators such as Kubernetes or HashiCorp Nomad, or when running inside a single node in any cloud provider.

```
 docker build -t nextjs-docker .
 docker run -p 3000:3000 nextjs-docker
```
* If you need to use different Environment Variables across multiple environments, check out our *with-docker-multi-env* example.

## Deploy on Vercel
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


### `.env.local` file example

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
BACKEND_URL=http://127.0.0.1:5000

NEXT_PUBLIC_PUSHER_APP_KEY=aaaadddddbbbbbb
NEXT_PUBLIC_PUSHER_DEBUGGING=True

NEXT_PUBLIC_FIREBASE_PROJECT_ID=easyretrospective-xxx
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=xxxxxxxx-xxxxxxx-xxxxxxx
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-do7gr@easyretrospective-xxxxx.iam.gserviceaccount.com
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=easyretrospective-xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://easyretrospective-xxxx-default-rtdb.xxxx-xxxxxx.firebasedatabase.app

FIREBASE_PRIVATE_KEY='private_key'

# Secrets used to sign cookies.
COOKIE_SECRET_CURRENT=someSecretValue
COOKIE_SECRET_PREVIOUS=anotherSecretValue

# Cookie options.
NEXT_PUBLIC_COOKIE_SECURE=false # set to true in HTTPS environment

```