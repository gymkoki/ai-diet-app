import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const imageUrl = body.imageUrl;

  if (!imageUrl) {
    return NextResponse.json({ error: "画像URLがありません" }, { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } },
          { type: "text", text: "この食事をABダイエット基準で添削してください。改善点があれば優しく具体的に書いてください。" },
        ],
      },
    ],
  });

  const result = response.choices[0]?.message?.content || "添削できませんでした。";

  return NextResponse.json({ result });
}
