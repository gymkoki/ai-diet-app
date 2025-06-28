import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"

export const maxDuration = 60

const analysisSchema = z.object({
  bCount: z.number().describe("ビタミンB群の推定含有量（1-10のスケール）"),
  goodPoints: z.array(z.string()).describe("この食事の良い点を日本語で3つ"),
  improvements: z.array(z.string()).describe("改善できる点を日本語で3つ"),
  overallAssessment: z.string().describe("全体的な栄養評価を日本語で"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "画像がアップロードされていません" }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const imageUrl = `data:${file.type};base64,${base64}`

    const result = await generateObject({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `この食事の画像を分析して、以下の観点から日本語で評価してください：
              1. ビタミンB群の含有量を1-10のスケールで評価
              2. この食事の栄養面での良い点を3つ
              3. 改善できる点を3つ
              4. 全体的な栄養評価
              
              日本語で詳細に分析してください。`,
            },
            {
              type: "image",
              image: new URL(imageUrl),
            },
          ],
        },
      ],
      schema: analysisSchema,
    })

    return NextResponse.json({
      success: true,
      data: result.object,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "分析中にエラーが発生しました。もう一度お試しください。",
      },
      { status: 500 },
    )
  }
}
