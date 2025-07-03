# 🎬 Intro Video Editor - Template Creation Guide

This guide will help you create your own custom intro video templates for the intro video editor.

## 📋 Current Templates

Your intro video editor now includes 10 templates:

1. **Typewriter** - Character-by-character text reveal
2. **FadeInText** - Smooth fade-in with scale animation
3. **SlideInText** - Slide-in from different directions with optional bounce
4. **BounceText** - Bouncing text animation with configurable intensity
5. **FluidText** - Text with a fluid/wave animation.
6. **OldSchoolText** - Retro text with scanlines.
7. **NeonText** - Glowing neon text effect.
8. **FunText** - Playful text with jumping and rotation.
9. **SimpleTitle** - Clean title and subtitle animation.
10. **LogoReveal** - Reveals a logo with an animated tagline.

## 🛠️ How to Create Your Own Template

### Step 1: Create the Effect Component

Create a new folder in `src/remotion/` and add your effect component:

```typescript
// src/remotion/YourEffect/YourEffect.tsx
import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';

// Define the schema for your template's properties
export const yourEffectSchema = z.object({
    text: z.string().default('Your Text'),
    duration: z.number().min(1).max(10).default(3),
    color: z.string().default('#ffffff'),
    fontSize: z.number().default(60),
    bgColor: z.string().default('#000000'),
    // Add more properties as needed
});

type YourEffectProps = z.infer<typeof yourEffectSchema>;

export const YourEffect: React.FC<YourEffectProps> = ({
    text,
    duration,
    color,
    fontSize,
    bgColor,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Your animation logic here
    const animationProgress = interpolate(
        frame,
        [0, duration * fps],
        [0, 1],
        { extrapolateRight: 'clamp' }
    );

    return (
        <div style={{ 
            flex: 1, 
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h1 style={{
                color,
                fontSize,
                opacity: animationProgress,
                // Add your animation styles
            }}>
                {text}
            </h1>
        </div>
    );
};
```

### Step 2: Register in Root.tsx

Add your template to `src/remotion/Root.tsx`:

```typescript
import { yourEffectSchema, YourEffect } from "./YourEffect/YourEffect";

// Add this inside the RemotionRoot component
<Composition
    id="YourEffect"
    component={YourEffect}
    durationInFrames={180}
    fps={30}
    width={1280}
    height={720}
    defaultProps={{
        text: 'Your Default Text',
        duration: 3,
        color: '#ffffff',
        fontSize: 70,
        bgColor: '#000000',
    }}
    schema={yourEffectSchema}
/>
```

### Step 3: Add to Template List

Update `src/lib/data.tsx` to include your template. Ensure you import your component and schema.

```typescript
// src/lib/data.tsx
import { YourEffect, yourEffectSchema } from '@/remotion/YourEffect/YourEffect'; // Adjust path as needed
// ... other imports

// Define the type for template entries if not already broadly defined
// (It is already defined in the actual src/lib/data.tsx)
// type TemplateEntry = {
//   id: string;
//   comp: React.FC<any>;
//   schema: z.ZodSchema<any>;
//   defaultProps: any;
//   description?: string;
//   width: number;
//   height: number;
// };

export const templates: TemplateEntry[] = [
    // ... existing templates
    {
        id: "YourEffect", // Should match the ID in Root.tsx
        comp: YourEffect,
        schema: yourEffectSchema,
        width: 1280, // Specify the composition width
        height: 720, // Specify the composition height
        defaultProps: {
            // These should match the schema and Root.tsx defaults
            text: "Your Template!",
            duration: 3,
            color: "#ffffff", // Or {r:255, g:255, b:255, a:1} if using zColor
            fontSize: 70,
            bgColor: "#1a1a1a", // Or {r:26, g:26, b:26, a:1}
        },
        description: "A brief description of what your template does.",
    },
];
```
**Note:** Ensure the `id`, `width`, `height`, and `defaultProps` in `src/lib/data.tsx` are consistent with what you defined in `src/remotion/Root.tsx` for the composition.

## 🎨 Animation Techniques

### 1. **Fade Effects**
```typescript
const opacity = interpolate(frame, [0, duration * fps], [0, 1]);
```

### 2. **Slide Effects**
```typescript
const slideX = interpolate(frame, [0, duration * fps], [-100, 0]);
const transform = `translateX(${slideX}px)`;
```

### 3. **Scale Effects**
```typescript
const scale = interpolate(frame, [0, duration * fps], [0, 1]);
const transform = `scale(${scale})`;
```

### 4. **Rotation Effects**
```typescript
const rotation = interpolate(frame, [0, duration * fps], [0, 360]);
const transform = `rotate(${rotation}deg)`;
```

### 5. **Color Transitions**
```typescript
const colorProgress = interpolate(frame, [0, duration * fps], [0, 1]);
const color = `hsl(${colorProgress * 360}, 70%, 50%)`;
```

### 6. **Bounce Effects**
```typescript
const bounceProgress = (frame % bounceDuration) / bounceDuration;
const bounceHeight = interpolate(
    bounceProgress,
    [0, 0.5, 1],
    [0, bounceIntensity * 10, 0]
);
```

## 🔧 Supported Field Types by `TemplateEditor`

The `TemplateEditor` component (`src/components/TemplateEditor.tsx`) attempts to render appropriate form controls based on the property's key and its value in `defaultValues` (derived from your Zod schema's defaults).

- **`zColor()` from `@remotion/zod-types`**: Rendered as a `<ColorPicker />`.
    - Example: `titleColor: zColor().default({r: 255, g: 255, b: 255, a: 1})`
- **Hex Color Strings**: Strings starting with `#` are also treated as colors and rendered with `<ColorPicker />`.
    - Example: `legacyColor: z.string().default('#FF0000')`
- **Boolean Values**: Rendered as a `<Checkbox />`.
    - Example: `useAdvancedFeature: z.boolean().default(true)`
- **Numbers**:
    - If the key matches specific names (e.g., `logoScale`), it can be rendered as a `<Slider />` with custom `min`, `max`, and `step`.
    - Otherwise, rendered as a standard HTML number input. The default step is guessed based on the key name (e.g., "Intensity" or "Count" might get step 1).
    - Example: `speed: z.number().default(5)`
    - Example for specific slider: `logoScale: z.number().min(0.1).max(2).default(1)`
- **Enum Strings**: If the key is `direction` and value is one of "left", "right", "top", "bottom", it's rendered as a `<Select />` dropdown. (This can be expanded for other enum-like fields if needed by modifying `TemplateEditor.tsx`).
    - Example: `slideDirection: z.enum(['left', 'right']).default('left')`
- **Image/File URLs**: If the key is `logoUrl`, it's rendered as a URL-optimized text input.
    - Example: `logoUrl: z.string().url().default(staticFile('default-logo.png'))`
- **Regular Strings**: Rendered as a standard text `<Input />`.
    - Example: `mainText: z.string().default('Hello World')`

### Field Type Examples in Zod Schema

```typescript
import { z } from 'zod';
import { zColor } from '@remotion/zod-types'; // Import for color objects
import { staticFile } from 'remotion'; // For default static file paths

export const yourEffectSchema = z.object({
    // Text input
    titleText: z.string().default('My Title'),

    // Color object (preferred for new templates)
    mainColor: zColor().default({ r: 255, g: 100, b: 50, a: 1 }),

    // Legacy hex color string
    accentColorHex: z.string().startsWith('#').default('#3498DB'),

    // Boolean checkbox
    enableShadow: z.boolean().default(false),

    // Number (generic input, could be slider if key is special-cased in TemplateEditor)
    animationSpeed: z.number().default(1.5),

    // Number (customized slider in TemplateEditor due to key 'logoScale')
    imageScale: z.number().min(0.5).max(3).default(1), // Schema definition

    // Enum (customized dropdown in TemplateEditor due to key 'direction')
    entryDirection: z.enum(['left', 'right', 'top', 'bottom']).default('left'),

    // URL input (customized in TemplateEditor due to key 'logoUrl')
    backgroundImageUrl: z.string().url().optional(), // .default(staticFile('background.jpg')),
});
```

## 📝 Template Examples

### Example 1: Simple Fade In
```typescript
export const simpleFadeSchema = z.object({
    text: z.string().default('Hello World'),
    duration: z.number().default(3),
    color: z.string().default('#ffffff'),
    bgColor: z.string().default('#000000'),
});

export const SimpleFade: React.FC<z.infer<typeof simpleFadeSchema>> = ({
    text, duration, color, bgColor
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const opacity = interpolate(frame, [0, duration * fps], [0, 1]);
    
    return (
        <div style={{ flex: 1, backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color, opacity }}>{text}</h1>
        </div>
    );
};
```

### Example 2: Multi-Step Animation
```typescript
export const multiStepSchema = z.object({
    text: z.string().default('Multi Step'),
    color: z.string().default('#ffffff'),
    bgColor: z.string().default('#000000'),
});

export const MultiStep: React.FC<z.infer<typeof multiStepSchema>> = ({
    text, color, bgColor
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    // Step 1: Fade in (0-1s)
    const fadeIn = interpolate(frame, [0, fps], [0, 1]);
    
    // Step 2: Scale up (1-2s)
    const scale = interpolate(frame, [fps, 2 * fps], [0.5, 1]);
    
    // Step 3: Rotate (2-3s)
    const rotation = interpolate(frame, [2 * fps, 3 * fps], [0, 360]);
    
    return (
        <div style={{ flex: 1, backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ 
                color, 
                opacity: fadeIn,
                transform: `scale(${scale}) rotate(${rotation}deg)`
            }}>
                {text}
            </h1>
        </div>
    );
};
```

## 🚀 Best Practices

1. **Use descriptive names** for your template IDs and components
2. **Provide sensible defaults** for all properties
3. **Use appropriate validation** in your Zod schemas
4. **Keep animations smooth** by using `interpolate` with proper easing
5. **Test your templates** with different property values
6. **Consider performance** - avoid complex calculations in render loops
7. **Use consistent styling** patterns across templates

## 🔍 Debugging Tips

1. **Check the browser console** for any errors
2. **Use the Remotion Player** to preview your animations
3. **Test with different durations** to ensure smooth playback
4. **Verify your schema** matches your component props
5. **Check that all imports** are correct in Root.tsx

## 📚 Resources

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

## 🎯 Next Steps

Now you have a solid foundation for creating custom intro templates! Try creating:

1. **Particle effects** with multiple animated elements
2. **Text reveal effects** with masking
3. **3D transformations** using CSS transforms
4. **Sound-synchronized animations** (advanced)
5. **Interactive templates** with user input

Happy template creating! 🎬✨ 