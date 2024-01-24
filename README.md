<a name="readme-top"></a>

# Companion.ai - A Modern Next.js 14 SaaS Companion AI Platform.

![Companion.ai - A Modern Next.js 14 SaaS Companion AI Platform.](/.github/images/img_main.png "Companion.ai - A Modern Next.js 14 SaaS Companion AI Platform.")

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

```bash
companion-ai/
  |- app/
    |-- (auth)/
        |--- (routes)/
            |---- sign-in/[[...sign-in]]/
            |---- sign-up/[[...sign-up]]/
        |--- layout.tsx
    |-- (chat)/
        |--- (routes)/
            |---- chat/[chatId]/
        |--- layout.tsx
    |-- (root)/
        |--- (routes)/
            |---- companion/[companionId]/
            |---- settings/
            |---- page.tsx
        |--- layout.tsx
    |-- api/
        |--- chat/
        |--- companion/
        |--- stripe/
        |--- webhook/
    |-- apple-icon.png
    |-- favicon.ico
    |-- globals.css
    |-- icon1.png
    |-- icon2.png
    |-- layout.tsx
  |- components/
    |-- ui/
    |-- bot-avatar.tsx
    |-- categories.tsx
    |-- chat-form.tsx
    |-- chat-header.tsx
    |-- chat-message.tsx
    |-- chat-messages.tsx
    |-- clerk-theme-provider.tsx.tsx
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
    |-- user-avatar.tsx
  |- config/
    |-- index.ts
  |- constants/
    |-- index.ts
  |- hooks/
    |-- use-debounce.tsx
    |-- use-pro-modal.tsx
  |- lib/
    |-- db.ts
    |-- memory.ts
    |-- rate-limit.ts
    |-- stripe.ts
    |-- subscription.ts
    |-- utils.ts
  |- prisma/
    |-- schema.prisma
  |- public/
    |-- empty.png
    |-- placeholder.svg
  |- schema/
    |-- index.ts
  |- scripts/
    |-- seed.ts
  |- .env
  |- .env.example
  |- .eslintrc.json
  |- .gitignore
  |- .npmrc
  |- components.json
  |- environment.d.ts
  |- middleware.ts
  |- next.config.js
  |- package-lock.json
  |- package.json
  |- postcss.config.js
  |- tailwind.config.ts
  |- tsconfig.json
```

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

# pinecone vector db credentials
PINECONE_INDEX="companion"
PINECONE_API_KEY=xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx

# upstash redis url and token
UPSTASH_REDIS_REST_URL="https://xxxxxxxxx-xxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# open ai key
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# replicate api token
REPLICATE_API_TOKEN=r8_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

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

### 6. OpenAI API Key:

Visit [OpenAI](https://platform.openai.com/signup/) and sign up for an account. Once registered, you can find your API key in the API section of your account settings. Copy the key and set it as the `OPENAI_API_KEY` in your project's environment.

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 7. Replicate API Token:

Sign up or log in to [Replicate](https://replicate.ai/). Once logged in, navigate to your account settings, and you'll find your API token. Copy the token and set it as the `REPLICATE_API_TOKEN` in your project's environment.

```env
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 8. Cloudinary Configuration:

- Visit the Cloudinary dashboard: [https://cloudinary.com](https://cloudinary.com)
- Log in to your Cloudinary account or sign up if you don't have one.
- Obtain your Cloud Name and Preset Name from the dashboard.
- Update the `.env` file with the following entries:
  ```env
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
  NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_preset_name
  ```

### 9. Pinecone Vector Database Integration:

- Access the Pinecone dashboard: [https://pinecone.io](https://pinecone.io)
- Log in to your Pinecone account or create a new one.
- Retrieve your Pinecone Index and API Key from the dashboard.
- Update the `.env` file with the following entries:
  ```env
  PINECONE_INDEX=your_companion_index
  PINECONE_API_KEY=your_pinecone_api_key
  ```

### 10. Upstash Redis Configuration:

- Visit the Upstash dashboard: [https://upstash.com](https://upstash.com)
- Log in to your Upstash account or create a new one.
- Obtain the Upstash Redis REST URL and REST Token.
- Update the `.env` file with the following entries:
  ```env
  UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
  UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
  ```

### 11. Aiven Database URL:

If you don't have an Aiven account, sign up [here](https://aiven.io/). After creating an account, set up a MySQL database. In the Aiven dashboard, find your database connection details and construct the `DATABASE_URL` in the following format:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/companion-ai?ssl-mode=REQUIRED"
```

### 12. Stripe API and Webhook Keys:

For Stripe, sign up or log in to your [Stripe Dashboard](https://dashboard.stripe.com/register). Once logged in, go to Developers > API keys to find your API secret key and webhook secret. Set them as `STRIPE_API_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in your project's environment.

```env
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 13. App Base URL:

Set the base URL of your application as `NEXT_PUBLIC_APP_URL` in your project's environment.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

14. Open terminal in root directory. Run `npm install --legacy-peer-deps` or `yarn install --legacy-peer-deps`.

### 15. Run the Seed Script:

In the same terminal, run the following command to execute the seed script:

```bash
node scripts/seed.js
```

This command uses `node` to execute the JavaScript file (`scripts/seed.js`) and writes category data in mysql database.

### 16. Verify Data in Database:

Once the script completes, check your MySQL database to ensure that the category data has been successfully seeded.

17. Now app is fully configured 👍 and you can start using this app using either one of `npm run dev` or `yarn dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

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

- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^4.29.3
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^3.3.4
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^5.8.0
- [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar): ^1.0.4
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.0.5
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.0.2
- [@radix-ui/react-progress](https://www.npmjs.com/package/@radix-ui/react-progress): ^1.0.3
- [@radix-ui/react-select](https://www.npmjs.com/package/@radix-ui/react-select): ^2.0.0
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.0.2
- [@clerk/themes](https://www.npmjs.com/package/@clerk/themes): ^1.7.9
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^3.3.4
- [@pinecone-database/pinecone](https://www.npmjs.com/package/@pinecone-database/pinecone): ^2.0.1
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^5.8.1
- [@radix-ui/react-alert-dialog](https://www.npmjs.com/package/@radix-ui/react-alert-dialog): ^1.0.5
- [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar): ^1.0.4
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.0.5
- [@radix-ui/react-dropdown-menu](https://www.npmjs.com/package/@radix-ui/react-dropdown-menu): ^2.0.6
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.0.2
- [@radix-ui/react-select](https://www.npmjs.com/package/@radix-ui/react-select): ^2.0.0
- [@radix-ui/react-separator](https://www.npmjs.com/package/@radix-ui/react-separator): ^1.0.3
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.0.2
- [@upstash/ratelimit](https://www.npmjs.com/package/@upstash/ratelimit): ^1.0.0
- [@upstash/redis](https://www.npmjs.com/package/@upstash/redis): ^1.28.1
- [ai](https://www.npmjs.com/package/ai): ^2.2.31
- [axios](https://www.npmjs.com/package/axios): ^1.6.5
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.0
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.0
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.3.1
- [langchain](https://www.npmjs.com/package/langchain): ^0.1.4
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^0.311.0
- [next](https://www.npmjs.com/package/next): 14.0.4
- [next-cloudinary](https://www.npmjs.com/package/next-cloudinary): ^5.19.0
- [next-themes](https://www.npmjs.com/package/next-themes): ^0.2.1
- [openai](https://www.npmjs.com/package/openai): ^4.24.7
- [openai-edge](https://www.npmjs.com/package/openai-edge): ^1.2.2
- [query-string](https://www.npmjs.com/package/query-string): ^8.1.0
- [react](https://www.npmjs.com/package/react): ^18
- [react-dom](https://www.npmjs.com/package/react-dom): ^18
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): ^7.49.3
- [react-spinners](https://www.npmjs.com/package/react-spinners): ^0.13.8
- [replicate](https://www.npmjs.com/package/replicate): ^0.25.2
- [sonner](https://www.npmjs.com/package/sonner): ^1.3.1
- [stripe](https://www.npmjs.com/package/stripe): ^14.13.0
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^2.2.0
- [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate): ^1.0.7
- [zod](https://www.npmjs.com/package/zod): ^3.22.4
- [zustand](https://www.npmjs.com/package/zustand): ^4.5.0

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fcompanion-ai "Tweet about this project")
[![Subscribe to my YouTube Channel](https://img.shields.io/youtube/channel/subscribers/UCNAz_hUVBG2ZUN8TVm0bmYw)](https://www.youtube.com/@OPGAMER./?sub_confirmation=1 "Subscribe to my YouTube Channel")

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
