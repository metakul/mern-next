This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


### Using Prsima

``` bash
    npm prisma init
# then 
    npm prsima generate
# then 
    npm prisma db push
```

### Implementing push notification
    Generating VAPID Keys
        1. Generate [VAPID](https://vapidkeys.com/) keys
        2. Run scripts/generate-vapid-keys.js via node