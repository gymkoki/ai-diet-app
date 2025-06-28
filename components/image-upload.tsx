"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Camera } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  disabled?: boolean
}

export default function ImageUpload({ onImageSelect, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [gptResult, setGptResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onImageSelect(file)
    }
  }

// ▼ 画像を Vercel Blob にアップロードする処理
const formData = new FormData();
formData.append("file", file);

try {
  const uploadRes = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const uploaded = await uploadRes.json();
  const uploadedUrl = uploaded.url;

  console.log("✅ アップロードされた画像URL：", uploadedUrl);

  // ▼ GPT-4 Vision API に送信
  const gptRes = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl: uploadedUrl }),
  });

  const gptData = await gptRes.json();
  console.log("🧠 GPTからの返答：", gptData.result);
} catch (err) {
  console.error("アップロードまたはGPT処理に失敗:", err);
}

  const clearImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return ( <>
   <>
    {gptResult && (
      <div className="mt-6 p-4 bg-green-50 border rounded">
        <h2 className="font-bold mb-2">GPTによる食事の添削結果</h2>
        <p>{gptResult}</p>
      </div>
    )}

    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {/* アップロードUIなど */}
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {preview ? (
          <div className="relative">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Selected food"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={clearImage}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">食事の写真をアップロード</p>
            <p className="text-sm text-gray-500">クリックして画像を選択</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {!preview && (
          <Button className="w-full mt-4" onClick={() => fileInputRef.current?.click()} disabled={disabled}>
            <Upload className="h-4 w-4 mr-2" />
            画像を選択
          </Button>
        )}
</CardContent>
</Card>
  </>
);
