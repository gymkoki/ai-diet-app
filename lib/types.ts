export interface AnalysisResult {
  bCount: number
  goodPoints: string[]
  improvements: string[]
  overallAssessment: string
}

export interface AnalysisResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}
