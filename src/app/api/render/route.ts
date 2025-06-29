import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { error: 'Invalid request body' },
                { status: 400 }
            );
        }

        const { templateId, inputProps } = body;

        if (!templateId || typeof templateId !== 'string') {
            return NextResponse.json(
                { error: 'templateId is required and must be a string' },
                { status: 400 }
            );
        }

        if (!inputProps || typeof inputProps !== 'object') {
            return NextResponse.json(
                { error: 'inputProps is required and must be an object' },
                { status: 400 }
            );
        }

        // Dynamic imports to avoid build-time issues
        const { bundle } = await import('@remotion/bundler');
        const { selectComposition, renderMedia } = await import('@remotion/renderer');
        const path = await import('path');

        const bundleLocation = await bundle({
            entryPoint: path.resolve(process.cwd(), 'src/remotion/index.ts'),
            webpackOverride: (c) => c
        });

        const composition = await selectComposition({
            serveUrl: bundleLocation,
            id: templateId,
            inputProps
        });

        const { buffer } = await renderMedia({
            serveUrl: bundleLocation,
            composition,
            codec: 'h264',
            inputProps,
            outputLocation: null,
        });

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Disposition': `attachment; filename="${templateId}.mp4"`,
            },
        });
    } catch (error) {
        console.error('Render error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}