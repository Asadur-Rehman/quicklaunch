import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { auth } from '@/lib/auth';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/ai/prompts';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { productName, description, targetAudience, tone } = body;

    if (!productName || !description) {
      return new Response(
        JSON.stringify({ error: 'Product name and description are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: buildSystemPrompt(),
      prompt: buildUserPrompt({
        productName,
        description,
        targetAudience,
        tone: tone || 'professional',
      }),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Generation failed';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
