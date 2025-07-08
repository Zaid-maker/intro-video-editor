# Advance Remotion Intro Editor

This is a advance remotion Intro Editor built using NextJS 15, Typescript, Tailwindcss, Shadcn UI and Remotion.

## Setup

Make sure you have [Bun](https://bun.sh/) installed on your system. [Bun](https://bun.sh/) is a fast, minimal, and secure JavaScript runtime.

Run the following command to install dependencies:

```bash
bun install
```

Run the following command to start the app:

```bash
bun run dev
```

Create a `.env` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_REMOTION_STUDIO_URL=http://localhost:3000
NEXT_PUBLIC_REMOTION_STUDIO_API_KEY=your_api_key
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
NODE_ENV=development
```

Run the following command to migrate the database:

```bash
bun run db:migrate
```

Run the following command to push the changes to the database:

```bash
bun run db:push
```

## Features

- User authentication using [BetterAuth](https://betterauth.com/)
- Remotion Studio integration using [Remotion Studio](https://remotion.dev/studio)
- Database integration using [Drizzle](https://drizzle-orm.com/)
- Tailwindcss integration using [Tailwindcss](https://tailwindcss.com/)
- Shadcn UI integration using [Shadcn UI](https://ui.shadcn.com/)
- NextJS 15 features using [NextJS 15](https://nextjs.org/)
