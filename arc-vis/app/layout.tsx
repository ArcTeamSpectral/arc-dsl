import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import fs from 'fs';
import path from 'path';
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ARC DSL VIS",
  description: "Visualization for ARC DSL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5e6d3]`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

async function get_data() {
  const filePath = path.join(process.cwd(), 'app', 'solvers_graphs.jsonl');
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const solvers_graphs = fileContents.trim().split('\n').map(line => JSON.parse(line));
  console.log(solvers_graphs);
  return solvers_graphs;
}

async function Layout({ children }: { children: React.ReactNode }) {
  const functionData = await get_data();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#e6d5bc] shadow-md m-4">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">ARC DSL VIS</h1>
          <nav>
            {/* Add navigation items here if needed */}
          </nav>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              Change Puzzle
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#f8f1e6]">
            <SheetHeader>
              <SheetTitle>Function List</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-10rem)] rounded-lg">
              {functionData.map((graph, index) => {
                const lineCount = graph.line_count || 0;
                const maxLineCount = Math.max(...functionData.map(g => g.line_count || 0));
                const hue = Math.round(255 * (1 - lineCount / maxLineCount));

                return (
                  <Link
                    key={index}
                    href={`/${graph.name}`}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-[#e6d5bc] transition-colors duration-200 ease-in-out border-b border-[#e6d5bc]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{index + 1}. {graph.name}</span>
                      <span style={{
                        backgroundColor: `hsl(${hue}, 100%, 95%)`
                      }} className="inline-flex items-center rounded-full bg-[#f0e0c8] px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {lineCount} lines
                      </span>
                    </div>
                  </Link>
                );
              })}
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 p-4">
          <ScrollArea className="h-[calc(100vh-10rem)] rounded-lg bg-[#f8f1e6]">
            {functionData.map((graph, index) => {
              const lineCount = graph.line_count || 0;
              const maxLineCount = Math.max(...functionData.map(g => g.line_count || 0));
              const hue = Math.round(255 * (1 - lineCount / maxLineCount));

              return (
                <Link
                  key={index}
                  href={`/${graph.name}`}
                  className="block w-full text-left px-4 py-2 opacity-40 hover:opacity-100 text-gray-700 hover:bg-[#e6d5bc] transition-colors duration-200 ease-in-out border-[#e6d5bc]"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{index + 1}. {graph.name}</span>
                    <span style={{
                      backgroundColor: `hsl(${hue}, 100%, 95%)`
                    }} className="inline-flex items-center rounded-full bg-[#f0e0c8] px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {lineCount} lines
                    </span>
                  </div>
                </Link>
              );
            })}
          </ScrollArea>
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
