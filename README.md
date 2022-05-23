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
