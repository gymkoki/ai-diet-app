import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI食事分析アプリ - Food Analyzer",
  description: "AI技術を使って食事の栄養バランスとビタミンB群を分析するアプリケーション",
  keywords: ["AI", "食事分析", "栄養", "ビタミンB", "GPT-4 Vision"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
