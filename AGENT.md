# Intro Video Editor - Agent Development Guide

## Commands
- `bun dev` or `npm run dev` - Start development server
- `bun run build` or `npm run build` - Build for production
- `bun run lint` or `npm run lint` - Run ESLint
- `bun run remotion` or `npm run remotion` - Open Remotion Studio
- `bun run render` or `npm run render` - Render video via CLI
- `bun run deploy` or `npm run deploy` - Custom deployment script

## Architecture
- **Next.js 15 App Router** with TypeScript, Tailwind CSS, shadcn/ui
- **Remotion 4.0.319** for video creation and rendering
- **Core directories**: `src/app/` (routes), `src/components/` (UI), `src/remotion/` (video templates)
- **Key files**: `src/app/intro/IntroClient.tsx` (main editor), `src/components/TemplateEditor.tsx` (dynamic forms)
- **Templates**: TypewriterTemplate, FadeInTextTemplate, SlideInTextTemplate, BounceTextTemplate
- **API routes**: `/api/render` (video rendering), `/api/lambda/render` (AWS Lambda)

## Code Style
- **TypeScript strict mode** with `@/*` path aliases
- **ESLint** with Next.js and Remotion rules
- **Zod schemas** for validation and type inference
- **shadcn/ui components** with Tailwind CSS utilities
- **React Hook Form** for form management
- Use `clsx` for conditional classes, `cn()` utility for merging
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error handling**: Try-catch blocks, proper error boundaries
- **Performance**: React.memo for expensive renders, lazy loading for heavy components
