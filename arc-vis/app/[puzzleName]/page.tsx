
import fs from 'fs';
import path from 'path';
import Mermaid from '@/components/Mermaid';
import ArcPuzzle from '@/components/ArcPuzzle';
import Notes from './Notes';
import ArcPuzzleCarousel from '@/components/ArcPuzzleCarousel';
async function getData(puzzleName: string) {
    const filePath = path.join(process.cwd(), 'app', 'solvers_graphs.jsonl');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const solvers_graphs = fileContents.trim().split('\n').map(line => JSON.parse(line));
    return solvers_graphs.find(graph => graph.name === puzzleName);
}

async function getPuzzle(puzzleName: string) {
    const filePath = path.join(process.cwd(), 'data', 'training', `${puzzleName}.json`);
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function PuzzlePage({ params }: { params: { puzzleName: string } }) {
    const graph = await getData(params.puzzleName);
    const puzzle = await getPuzzle(params.puzzleName);
    if (!graph) {
        return <div>Puzzle not found</div>;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{graph.name}</h1>
            <Notes puzzleName={params.puzzleName} />
            <ArcPuzzle puzzle={puzzle} />
            <div className="mx-10">
                <ArcPuzzleCarousel puzzle={puzzle} />
            </div>
            <div className="mt-8"></div>
            <div className="flex w-full h-[600px] flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <Mermaid chart={graph.graph} />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="whitespace-pre font-mono text-sm overflow-auto h-full">
                        {graph.function}
                    </div>
                </div>
            </div>
        </div>
    );
}

