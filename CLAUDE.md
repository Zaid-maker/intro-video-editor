# Intro Video Editor - Claude Development Guide

## Project Overview

This is an advanced intro video editor built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Remotion. The application allows users to create custom intro videos using various animation templates with real-time preview and rendering capabilities.

## Technology Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Frontend library
- **TypeScript** - Type safety and development experience
- **Remotion 4.0.319** - Video creation and rendering engine
- **Tailwind CSS 4.0.3** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Zod** - Schema validation and type inference

### Key Dependencies
- **@remotion/player** - Video player component
- **@remotion/bundler** - Bundling for video rendering
- **@remotion/lambda** - AWS Lambda integration for rendering
- **@remotion/renderer** - Video rendering engine
- **react-hook-form** - Form state management
- **react-colorful** - Color picker component
- **@vercel/analytics** - Analytics integration

### Development Tools
- **Bun** - Package manager and runtime
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (landing)/         # Landing page components
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── intro/             # Main intro editor
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── TemplateEditor.tsx # Main editor component
├── remotion/             # Video templates and compositions
│   ├── BounceText/       # Bounce animation template
│   ├── FadeInText/       # Fade in animation template
│   ├── SlideInText/      # Slide in animation template
│   ├── Typewriter/       # Typewriter effect template
│   └── Root.tsx          # Remotion root configuration
├── helpers/              # Utility functions
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
└── types/                # TypeScript type definitions
```

### Key Components

#### 1. IntroClient (`src/app/intro/IntroClient.tsx`)
- Main application component with tabbed interface
- Manages template selection and properties
- Integrates Remotion Player for real-time preview
- Handles video rendering and download

#### 2. TemplateEditor (`src/components/TemplateEditor.tsx`)
- Dynamic form generation based on Zod schemas
- Auto-detects field types (color, boolean, number, enum, string)
- Tabbed interface for organizing properties (general, colors, animation)
- Real-time property updates

#### 3. Video Templates (`src/remotion/`)
- **TypewriterEffect** - Character-by-character text reveal
- **FadeInTextEffect** - Smooth fade-in with scale animation
- **SlideInTextEffect** - Slide-in from different directions
- **BounceTextEffect** - Bouncing text animation

#### 4. API Routes (`src/app/api/`)
- `/api/render` - Handles video rendering requests
- `/api/lambda/render` - AWS Lambda rendering integration
- `/api/lambda/progress` - Rendering progress tracking

## Available Commands

```bash
# Development
npm run dev          # Start development server
bun dev             # Start with Bun

# Building
npm run build       # Build for production
npm run start       # Start production server

# Linting
npm run lint        # Run ESLint

# Remotion
npm run remotion    # Open Remotion Studio
npm run render      # Render video via CLI

# Deployment
npm run deploy      # Custom deployment script
```

## Development Setup

### Prerequisites
- Node.js 18+ or Bun 1.2.15+
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd intro-video-editor

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

### Environment Variables
The application uses environment variables for AWS Lambda configuration and other services. Check `deploy.mjs` for deployment-specific variables.

## Key Features

### 1. Template System
- Extensible template architecture using Zod schemas
- Dynamic form generation based on template properties
- Real-time preview with Remotion Player
- Type-safe property validation

### 2. Video Rendering
- Server-side rendering with Remotion
- AWS Lambda integration for scalable rendering
- Progress tracking and download functionality
- Multiple output formats supported

### 3. User Interface
- Responsive design with Tailwind CSS
- Dark/light theme support via next-themes
- Tabbed interface for better organization
- shadcn/ui components for consistent design

### 4. Performance Optimizations
- Next.js App Router for optimal performance
- Server-side rendering exclusion for Remotion
- Webpack optimizations for bundling
- Image optimization and lazy loading

## Creating Custom Templates

### Template Structure
Each template consists of:
1. **Effect Component** - React component with animation logic
2. **Zod Schema** - Property validation and type inference
3. **Registration** - Added to Root.tsx and template list

### Example Template Creation
```typescript
// 1. Create effect component
export const CustomEffect: React.FC<CustomEffectProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Animation logic using interpolate
  const progress = interpolate(frame, [0, props.duration * fps], [0, 1]);
  
  return (
    <div style={{ /* animation styles */ }}>
      {props.text}
    </div>
  );
};

// 2. Define schema
export const customEffectSchema = z.object({
  text: z.string().default('Custom Text'),
  duration: z.number().default(3),
  color: z.string().default('#ffffff'),
});

// 3. Register in Root.tsx and template list
```

## API Integration

### Rendering API
```typescript
POST /api/render
{
  "templateId": "typewriter",
  "inputProps": {
    "text": "Hello World",
    "speed": 5,
    "color": "#ffffff"
  }
}
```

### Lambda Rendering
```typescript
POST /api/lambda/render
{
  "id": "composition-id",
  "inputProps": { /* template properties */ }
}
```

## Configuration Files

### Next.js Configuration (`next.config.js`)
- Webpack optimizations for Remotion
- Server-side rendering exclusions
- Node.js module fallbacks

### Remotion Configuration (`remotion.config.ts`)
- Video output format settings
- Webpack override configuration

### TypeScript Configuration (`tsconfig.json`)
- Path aliases for clean imports
- Strict type checking enabled
- Next.js plugin integration

## Best Practices

### Code Organization
- Use TypeScript for all components
- Follow component composition patterns
- Implement proper error boundaries
- Use Zod for runtime validation

### Performance
- Lazy load heavy components
- Optimize animation calculations
- Use React.memo for expensive renders
- Implement proper caching strategies

### Testing
- Test template rendering logic
- Validate API endpoints
- Test form validation
- Ensure responsive design

## Deployment

### Vercel Deployment
- Configured with `vercel.json`
- Custom build command includes deployment script
- Automatic preview deployments

### Build Process
1. Run custom deployment script (`deploy.mjs`)
2. Next.js build process
3. Static asset optimization
4. Vercel deployment

## Troubleshooting

### Common Issues
1. **Remotion build errors** - Check webpack configuration
2. **Template not rendering** - Verify schema and registration
3. **API failures** - Check environment variables
4. **Performance issues** - Optimize animation calculations

### Debug Tools
- Next.js DevTools
- Remotion Studio for template development
- Browser DevTools for performance
- ESLint for code quality

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Run linting and type checking
4. Test in development environment
5. Submit pull request

### Code Standards
- Follow TypeScript strict mode
- Use ESLint configuration
- Maintain consistent formatting
- Document complex logic

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Remotion Documentation](https://remotion.dev/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Template Creation Guide](./TEMPLATE_CREATION_GUIDE.md)