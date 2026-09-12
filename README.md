<a name="readme-top"></a>

# Companion.ai - A Modern Next.js 16 SaaS Companion AI Platform.

![Companion.ai - A Modern Next.js 16 SaaS Companion AI Platform.](/.github/images/img_main.png "Companion.ai - A Modern Next.js 16 SaaS Companion AI Platform.")

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/companion-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/blob/main/LICENSE "GitHub license")
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/commits/main "Maintenance")
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/companion-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/branches "GitHub branches")
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/companion-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/commits "Github commits")
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/companion-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/issues "GitHub issues")
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/companion-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/companion-ai/pulls "GitHub pull requests")
[![Netlify Status](https://api.netlify.com/api/v1/badges/db5ef842-ce7c-48c0-b905-c07a7fd5306c/deploy-status)](https://aicompanion.netlify.app/ "Netlify Status")

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

<!--- FOLDER_STRUCTURE_START --->
```bash
companion-ai/
  |- app/
    |-- (auth)/
    |-- (chat)/
    |-- (root)/
    |-- api/
    |-- apple-icon.png
    |-- favicon.ico
    |-- globals.css
    |-- icon1.png
    |-- icon2.png
    |-- layout.tsx
  |- components/
    |-- ui/
    |-- api-keys-form.tsx
    |-- bot-avatar.tsx
    |-- categories.tsx
    |-- chat-form.tsx
    |-- chat-header.tsx
    |-- chat-message.tsx
    |-- chat-messages.tsx
    |-- clerk-theme-provider.tsx
    |-- companion-form.tsx
    |-- companions.tsx
    |-- image-upload.tsx
    |-- mobile-sidebar.tsx
    |-- mode-toggle.tsx
    |-- navbar.tsx
    |-- pro-modal.tsx
    |-- providers.tsx
    |-- search-input.tsx
    |-- sidebar.tsx
    |-- subscription-button.tsx
    |-- theme-provider.tsx
    |-- user-avatar.tsx
  |- config/
    |-- index.ts
  |- hooks/
    |-- use-debounce.ts
    |-- use-is-client.ts
    |-- use-pro-modal.ts
    |-- use-require-api-keys.ts
  |- lib/
    |-- db.ts
    |-- encryption.ts
    |-- memory.ts
    |-- rate-limit.ts
    |-- stripe.ts
    |-- subscription.ts
    |-- user-api-keys.ts
    |-- utils.ts
  |- prisma/
    |-- schema.prisma
  |- public/
  |- schema/
    |-- index.ts
  |- scripts/
    |-- seed.mjs
  |- .env.example
  |- .env/.env.local
  |- .gitignore
  |- components.json
  |- css.d.ts
  |- environment.d.ts
  |- eslint.config.mjs
  |- netlify.toml
  |- next.config.ts
  |- package.json
  |- pnpm-lock.yaml
  |- pnpm-workspace.yaml
  |- postcss.config.mjs
  |- prisma.config.ts
  |- proxy.ts
  |- tsconfig.json
```
<!--- FOLDER_STRUCTURE_END --->

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env` file in **root** directory.
4. Contents of `.env`:

```env
# .env

# disabled next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# clerk auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# clerk auth redirect urls
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# aiven db url
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/companion-ai?ssl-mode=REQUIRED"

# cloudinary cloud name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxxxxxxxxxx
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=xxxxxxxxxxx

# upstash redis url and token
UPSTASH_REDIS_REST_URL="https://xxxxxxxxx-xxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# ai settings cookie name and verification secret (generated by `openssl rand -hex 32`)
AI_SETTINGS_COOKIE_NAME=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VERIFICATION_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# stripe api secret key & webhook secret
STRIPE_API_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# next public app url
NEXT_PUBLIC_APP_URL=http://localhost:3000

```

### 5. Clerk Authentication Keys:

- Visit the Clerk dashboard: [https://clerk.dev](https://clerk.dev)
- Log in to your Clerk account or sign up if you don't have one.
- Go to the "Projects" section and select your project.
- Navigate to the "API Keys" tab.
- Copy the "Publishable Key" and replace `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the `.env` file with the copied key.
- Copy the "Secret Key" and replace `CLERK_SECRET_KEY` in the `.env` file with the copied key.

### 6. AI Settings Cookie Secrets:

Generate two separate secrets with `openssl rand -hex 32` and set them as `AI_SETTINGS_COOKIE_NAME` and `VERIFICATION_SECRET`. These encrypt and name the httpOnly cookie that stores each user's OpenAI, Replicate, and Pinecone credentials from **Settings**.

```env
AI_SETTINGS_COOKIE_NAME=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VERIFICATION_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 7. Cloudinary Configuration:

- Visit the Cloudinary dashboard: [https://cloudinary.com](https://cloudinary.com)
- Log in to your Cloudinary account or sign up if you don't have one.
- Obtain your Cloud Name and Preset Name from the dashboard.
- Update the `.env` file with the following entries:
  ```env
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
  NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_preset_name
  ```

### 8. Upstash Redis Configuration:

- Visit the Upstash dashboard: [https://upstash.com](https://upstash.com)
- Log in to your Upstash account or create a new one.
- Obtain the Upstash Redis REST URL and REST Token.
- Update the `.env` file with the following entries:
  ```env
  UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
  UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
  ```

### 9. Aiven Database URL:

If you don't have an Aiven account, sign up [here](https://aiven.io/). After creating an account, set up a MySQL database. In the Aiven dashboard, find your database connection details and construct the `DATABASE_URL` in the following format:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/companion-ai?ssl-mode=REQUIRED"
```

### 10. Stripe API and Webhook Keys:

For Stripe, sign up or log in to your [Stripe Dashboard](https://dashboard.stripe.com/register). Once logged in, go to Developers > API keys to find your API secret key and webhook secret. Set them as `STRIPE_API_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in your project's environment.

```env
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 11. App Base URL:

Set the base URL of your application as `NEXT_PUBLIC_APP_URL` in your project's environment.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

12. Open terminal in root directory. Run `npm install --legacy-peer-deps` or `pnpm install --legacy-peer-deps`.

### 13. Run the Seed Script:

In the same terminal, run the following command to execute the seed script:

```bash
node scripts/seed.js
```

This command uses `node` to execute the JavaScript file (`scripts/seed.js`) and writes category data in mysql database.

### 14. Verify Data in Database:

Once the script completes, check your MySQL database to ensure that the category data has been successfully seeded.

15. Now app is fully configured 👍 and you can start using this app using either one of `npm run dev` or `pnpm dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

### :raising_hand: Need Help?

If you run into issues during installation or setup:

- **GitHub Discussions** — [Open a Q&A discussion](https://github.com/sanidhyy/companion-ai/discussions/new?category=q-a) for setup and troubleshooting help.
- **Email** — [sanidhyyy@gmail.com](mailto:sanidhyyy@gmail.com)
- **Discord** — `@sanidhyy`

## :camera: Screenshots

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Create Companions](/.github/images/img2.png "Create Companions")

![Chat with Companions](/.github/images/img3.png "Chat with Companions")

![Pro Subscription](/.github/images/img4.png "Pro Subscription")

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Netlify](https://skillicons.dev/icons?i=netlify "Netlify")](https://netlify.app/ "Netlify") [![Prisma](https://skillicons.dev/icons?i=prisma "Prisma")](https://prisma.io/ "Prisma") [![MySQL](https://skillicons.dev/icons?i=mysql "MySQL")](https://mysql.com/ "MySQL")

## :wrench: Stats

[![Stats for Companion.ai](/.github/images/stats.svg "Stats for Companion.ai")](https://pagespeed.web.dev/analysis?url=https://aicompanion.netlify.app/ "Stats for Companion.ai")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Companion.ai.

- Thanks to CodeWithAntonio: https://codewithantonio.com/
<!--- DEPENDENCIES_START --->
- [@ai-sdk/react](https://www.npmjs.com/package/@ai-sdk/react): ^4.0.100
- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^7.9.2
- [@clerk/ui](https://www.npmjs.com/package/@clerk/ui): ^1.32.3
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^5.9.1
- [@langchain/community](https://www.npmjs.com/package/@langchain/community): ^1.1.29
- [@langchain/core](https://www.npmjs.com/package/@langchain/core): ^1.2.10
- [@langchain/openai](https://www.npmjs.com/package/@langchain/openai): ^1.5.12
- [@langchain/pinecone](https://www.npmjs.com/package/@langchain/pinecone): ^1.0.3
- [@pinecone-database/pinecone](https://www.npmjs.com/package/@pinecone-database/pinecone): ^5.1.2
- [@prisma/adapter-mariadb](https://www.npmjs.com/package/@prisma/adapter-mariadb): ^7.10.0
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^7.10.0
- [@radix-ui/react-alert-dialog](https://www.npmjs.com/package/@radix-ui/react-alert-dialog): ^1.1.23
- [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar): ^1.2.6
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.1.23
- [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu): ^2.1.24
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.1.15
- [@radix-ui/react-select](https://www.npmjs.com/package/@radix-ui/react-select): ^2.3.7
- [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator): ^1.1.15
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.3.3
- [@radix-ui/react-visually-hidden](https://www.npmjs.com/package/@radix-ui/react-visually-hidden): ^1.2.11
- [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss): ^4.3.3
- [@types/node](https://www.npmjs.com/package/@types/node): ^25.9.6
- [@types/react](https://www.npmjs.com/package/@types/react): 19.3.0
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): 19.3.0
- [@upstash/ratelimit](https://www.npmjs.com/package/@upstash/ratelimit): ^2.0.8
- [@upstash/redis](https://www.npmjs.com/package/@upstash/redis): ^1.38.4
- [ai](https://www.npmjs.com/package/ai): ^7.0.97
- [axios](https://www.npmjs.com/package/axios): ^1.20.0
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.1
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.1
- [dotenv](https://www.npmjs.com/package/dotenv): ^17.4.2
- [eslint](https://www.npmjs.com/package/eslint): 9.39.5
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 16.3.4
- [langchain](https://www.npmjs.com/package/langchain): ^1.5.11
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^1.44.0
- [mariadb](https://www.npmjs.com/package/mariadb): ^3.5.4
- [next](https://www.npmjs.com/package/next): 16.3.4
- [next-cloudinary](https://www.npmjs.com/package/next-cloudinary): ^6.18.8
- [next-themes](https://www.npmjs.com/package/next-themes): ^0.4.6
- [postcss](https://www.npmjs.com/package/postcss): ^8.5.28
- [prisma](https://www.npmjs.com/package/prisma): ^7.10.0
- [query-string](https://www.npmjs.com/package/query-string): ^9.5.1
- [react](https://www.npmjs.com/package/react): 19.3.0
- [react-dom](https://www.npmjs.com/package/react-dom): 19.3.0
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): ^7.87.0
- [react-spinners](https://www.npmjs.com/package/react-spinners): ^0.17.1
- [replicate](https://www.npmjs.com/package/replicate): ^1.4.0
- [sonner](https://www.npmjs.com/package/sonner): ^2.0.8
- [stripe](https://www.npmjs.com/package/stripe): ^22.6.2
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^3.6.0
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^4.3.3
- [tw-animate-css](https://www.npmjs.com/package/tw-animate-css): ^1.4.0
- [typescript](https://www.npmjs.com/package/typescript): ^6.0.3
- [zod](https://www.npmjs.com/package/zod): ^4.6.1
- [zustand](https://www.npmjs.com/package/zustand): ^5.0.15

<!--- DEPENDENCIES_END --->

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fcompanion-ai "Tweet about this project")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/companion-ai&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/companion-ai&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/companion-ai&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/companion-ai&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
