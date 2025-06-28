"use client"

import { useState } from "react"
import type { AnalysisResponse } from "@/lib/types"

export function useFoodAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResponse | null>(null)

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data: AnalysisResponse = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: "ネットワークエラーが発生しました。",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    analyzeImage,
    isAnalyzing,
    result,
    clearResult: () => setResult(null),
  }
}
