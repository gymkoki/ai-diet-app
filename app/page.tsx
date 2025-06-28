import type { Metadata } from "next"
import FoodAnalyzer from "@/components/food-analyzer"

export const metadata: Metadata = {
  title: "Food Image Analyzer",
  description: "Upload food images and get dietary feedback in Japanese using GPT-4 Vision",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">食品画像分析</h1>
        <p className="text-center mb-8 text-gray-600">
          食べ物の写真をアップロードして、GPT-4 Visionを使った栄養分析を日本語で受け取りましょう。
        </p>
        <FoodAnalyzer />
      </div>
    </main>
  )
}
