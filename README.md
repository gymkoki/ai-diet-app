# Food Image Analyzer

A Next.js 14 application that analyzes food images using GPT-4 Vision and provides dietary feedback in Japanese.

## Features

- Upload food images for analysis
- Get nutritional feedback in Japanese using GPT-4 Vision
- Responsive design for mobile and desktop
- Dark mode support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components
- OpenAI GPT-4 Vision API
- AI SDK

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- OpenAI API key

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/food-image-analyzer.git
cd food-image-analyzer
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn
# or
pnpm install
\`\`\`

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

4. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is ready to be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/food-image-analyzer)

Make sure to add your `OPENAI_API_KEY` to the environment variables in your Vercel project settings.

## License

MIT
