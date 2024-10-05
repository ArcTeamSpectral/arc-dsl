'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import NavLink from "@/components/NavLink";


export default function Sidebar({ functionData }: { functionData: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = functionData.filter(graph =>
        graph.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        graph.function?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 p-4">
            <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />
            <div className="text-sm text-gray-600 mb-2">{filteredData.length} results</div>
            <ScrollArea className="h-[calc(100vh-16rem)] rounded-lg bg-[#f8f1e6]">
                {filteredData.map((graph, index) => {
                    const lineCount = graph.line_count || 0;
                    const maxLineCount = Math.max(...functionData.map(g => g.line_count || 0));
                    const hue = Math.round(255 * (1 - lineCount / maxLineCount));

                    return (
                        <NavLink
                            key={index}
                            href={`/${graph.name}`}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#e6d5bc] transition-colors duration-200 ease-in-out border-[#e6d5bc]"
                            activeClassName="bg-[#e6d5bc]"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">{index + 1}. {graph.name}</span>
                                <span style={{
                                    backgroundColor: `hsl(${hue}, 100%, 95%)`
                                }} className="inline-flex items-center rounded-full bg-[#f0e0c8] px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                    {lineCount} lines
                                </span>
                            </div>
                        </NavLink>
                    );
                })}
            </ScrollArea>
        </aside>
    );
}