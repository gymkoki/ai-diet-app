"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Star } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"

interface AnalysisResultsProps {
  result: AnalysisResult
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const getBCountColor = (count: number) => {
    if (count >= 8) return "bg-green-500"
    if (count >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getBCountText = (count: number) => {
    if (count >= 8) return "豊富"
    if (count >= 5) return "普通"
    return "不足"
  }

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* B Count Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            ビタミンB群スコア
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">{result.bCount}/10</div>
            <Badge className={`${getBCountColor(result.bCount)} text-white`}>{getBCountText(result.bCount)}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Good Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            良い点
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.goodPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="h-5 w-5" />
            改善点
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>総合評価</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{result.overallAssessment}</p>
        </CardContent>
      </Card>
    </div>
  )
}
