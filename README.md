# 🍽️ AI食事分析アプリ (AI Food Analyzer)

GPT-4 Visionを使用して食事の写真を分析し、栄養バランスとビタミンB群の含有量を評価するNext.js 14アプリケーションです。

## 🌟 機能

- 📸 食事の写真アップロード
- 🤖 GPT-4 Visionによる画像分析
- 🍎 ビタミンB群スコア（1-10）
- ✅ 栄養面での良い点の指摘
- 💡 改善提案
- 📊 総合的な栄養評価
- 🇯🇵 日本語での詳細フィードバック

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- OpenAI API キー

### インストール

1. リポジトリをクローン:
\`\`\`bash
git clone <your-repo-url>
cd food-analyzer
\`\`\`

2. 依存関係をインストール:
\`\`\`bash
npm install
\`\`\`

3. 環境変数を設定:
\`\`\`bash
cp .env.example .env.local
\`\`\`

`.env.local`ファイルを編集してOpenAI API キーを設定:
\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

4. 開発サーバーを起動:
\`\`\`bash
npm run dev
\`\`\`

5. ブラウザで `http://localhost:3000` を開く

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **AI**: OpenAI GPT-4 Vision
- **AI SDK**: Vercel AI SDK
- **スタイリング**: Tailwind CSS
- **UI コンポーネント**: shadcn/ui
- **言語**: TypeScript
- **アイコン**: Lucide React

## 📁 プロジェクト構造

\`\`\`
├── app/
│   ├── api/analyze/route.ts    # GPT-4 Vision API エンドポイント
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # メインページ
├── components/
│   ├── image-upload.tsx        # 画像アップロードコンポーネント
│   └── analysis-results.tsx    # 分析結果表示コンポーネント
├── hooks/
│   └── use-food-analysis.ts    # 食事分析カスタムフック
├── lib/
│   └── types.ts                # TypeScript型定義
└── README.md
\`\`\`

## 🔧 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API キー | ✅ |

## 📝 使用方法

1. 食事の写真を撮影またはアップロード
2. 「分析開始」ボタンをクリック
3. AIが画像を分析（最大60秒）
4. 結果を確認:
   - ビタミンB群スコア
   - 栄養面での良い点
   - 改善提案
   - 総合評価

## 🚀 デプロイ

### Vercelでのデプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数 `OPENAI_API_KEY` を設定
3. デプロイ

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- OpenAI GPT-4 Vision
- Vercel AI SDK
- Next.js チーム
- shadcn/ui
\`\`\`

Let's also create an environment variables example file:
