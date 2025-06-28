"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RotateCcw } from "lucide-react"
import ImageUpload from "@/components/image-upload"
import AnalysisResults from "@/components/analysis-results"
import { useFoodAnalysis } from "@/hooks/use-food-analysis"

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { analyzeImage, isAnalyzing, result, clearResult } = useFoodAnalysis()

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeImage(selectedFile)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    clearResult()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🍽️ AI食事分析アプリ</h1>
          <p className="text-gray-600">食事の写真をアップロードして、栄養バランスとビタミンB群の分析を受けましょう</p>
        </div>

        <div className="space-y-8">
          {/* Upload Section */}
          <ImageUpload onImageSelect={setSelectedFile} disabled={isAnalyzing} />

          {/* Action Buttons */}
          {selectedFile && !result && (
            <div className="flex justify-center gap-4">
              <Button onClick={handleAnalyze} disabled={isAnalyzing} size="lg" className="min-w-32">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  "分析開始"
                )}
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isAnalyzing} size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                リセット
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">AI が画像を分析しています...</p>
                <p className="text-sm text-gray-500 mt-2">少々お待ちください（最大60秒）</p>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {result && !result.success && (
            <Card className="w-full max-w-md mx-auto border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">エラー</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">{result.error}</p>
                <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                  もう一度試す
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {result && result.success && result.data && (
            <>
              <AnalysisResults result={result.data} />
              <div className="flex justify-center">
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  新しい画像を分析
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
