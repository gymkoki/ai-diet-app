import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File | null

    if (!imageFile) {
      return NextResponse.json({ error: "画像ファイルが見つかりません" }, { status: 400 })
    }

    // Convert the file to a base64 string
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const dataURI = `data:${imageFile.type};base64,${base64Image}`

    // Analyze the image with GPT-4 Vision
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: `あなたは栄養士です。アップロードされた食品の画像を分析し、以下の情報を日本語で提供してください：
          
          1. ビタミンB群の含有量の推定（高、中、低）
          2. 栄養面での良い点（3つ）
          3. 改善できる点（2つ）
          
          回答は簡潔に、箇条書きで提供してください。`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "食品の画像を分析してください" },
            { type: "image", image: new URL(dataURI) },
          ],
        },
      ],
    })

    return NextResponse.json({ analysis: text })
  } catch (error) {
    console.error("Error analyzing image:", error)
    return NextResponse.json({ error: "画像の分析中にエラーが発生しました" }, { status: 500 })
  }
}
