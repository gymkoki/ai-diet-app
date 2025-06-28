"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader2, Camera } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function FoodAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)
    setAnalysis(null)
    setSelectedImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage) {
      setError("画像を選択してください")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "分析中にエラーが発生しました")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setPreview(null)
    setAnalysis(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="image-upload"
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 cursor-pointer w-full max-w-md mx-auto flex flex-col items-center justify-center",
                  preview ? "border-green-500" : "border-gray-300 hover:border-gray-400",
                )}
              >
                {preview ? (
                  <div className="relative w-full aspect-square max-w-xs">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Food preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <Camera className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">クリックして食品の画像をアップロード</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF形式をサポート</p>
                  </>
                )}
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button type="submit" disabled={!selectedImage || isLoading} className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    分析する
                  </>
                )}
              </Button>
              {preview && (
                <Button type="button" variant="outline" onClick={handleReset}>
                  リセット
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {analysis && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">分析結果</h2>
            <div className="whitespace-pre-wrap">{analysis}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
