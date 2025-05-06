# AI Video Creator - Frontend

This is the frontend service for the AI Video Creator application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18.0 or higher)
- npm (comes with Node.js) 

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-video-creator/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:<your_backend_port>
# Add any other required environment variables here
## Additional Configuration

1. **Configure your backend port**
   Ensure that the backend server is running on the specified port in the environment variable.

2. **Set up any additional configurations**
   Review the application requirements and configure any additional settings as needed.

3. **Check for updates**
   Ensure that all dependencies are up to date before starting the development server.

4. **Run the development server**
   To start the development server, use the following command:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/           # App router pages and layouts
├── components/    # Reusable UI components
├── features/      # Feature-specific components and logic
├── hooks/         # Custom React hooks
├── lib/          # Utility libraries and configurations
└── types/        # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
