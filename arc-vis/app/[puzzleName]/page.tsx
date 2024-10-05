
import fs from 'fs';
import path from 'path';
import Mermaid from '@/components/Mermaid';

async function getData(puzzleName: string) {
    const filePath = path.join(process.cwd(), 'app', 'solvers_graphs.jsonl');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const solvers_graphs = fileContents.trim().split('\n').map(line => JSON.parse(line));
    return solvers_graphs.find(graph => graph.name === puzzleName);
}

export default async function PuzzlePage({ params }: { params: { puzzleName: string } }) {
    const graph = await getData(params.puzzleName);

    if (!graph) {
        return <div>Puzzle not found</div>;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{graph.name}</h1>
            <div className="flex w-full h-[600px]">
                <div className="w-1/2">
                    <Mermaid chart={graph.graph} />
                </div>
                <div className="w-1/2">
                    <div className="whitespace-pre font-mono text-sm overflow-auto h-full">
                        {graph.function}
                    </div>
                </div>
            </div>
        </div>
    );
}

