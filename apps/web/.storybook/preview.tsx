import type { Preview } from "@storybook/nextjs-vite";
import { Inter } from "next/font/google";

import "../app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`font-sans ${inter.variable}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;