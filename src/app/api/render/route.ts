import { bundle } from '@remotion/bundler';
import { NextResponse } from 'next/server';
import { selectComposition, renderMedia } from '@remotion/renderer';
import path from 'path';

export async function POST(req: Request) {
    const { templateId, inputProps } = await req.json();

    const bundleLocation = await bundle({
        entryPoint: path.resolve('./remotion/index.ts'),
        webpackOverride: (c) => c
    })

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
    })

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'video/mp4',
            'Content-Disposition': `attachment; filename="${templateId}.mp4"`,
        },
    });
}