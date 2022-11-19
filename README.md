# Create T3 App

## Quickstart

1. Run a mysql instance - e.g. via planetscale
2. Get web3storage and twitch app credentials and API tokens
3. Copy .env.example into .env and fill out env vars
4. Run `pnpm install`
5. Run `pnpm prisma generate`
6. Run `pnpm run dev`



## TODO


[] More accurate prisma models
[] auth, protected trpc mutations and proposed by field
[] vote signature -> web3.storage
[] orbitdb votes storage?
[] tailwind card components and improve dao, proposals displays
[] deploy dao
[] proposal add function call and args helper component
[] create proposal on chain
[] pinapple js or any other ipfs storage/pinning service



## How do I deploy this?

Follow our deployment guides for [Vercel](https://beta.create.t3.gg/en/deployment/vercel) and [Docker](https://beta.create.t3.gg/en/deployment/docker) for more information.
