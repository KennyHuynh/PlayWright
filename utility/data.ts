import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Jsonnet } from '@unboundedsystems/jsonnet';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonnet = new Jsonnet();

export class DataLoader {
    private _filePath: string;


    constructor(fileName: string) {
        this._filePath = path.join(__dirname, fileName);
    }

    get filePath(): string {
        return this._filePath;
    }

    set filePath(value: string) {
        this._filePath = value;
    }

    public getDataFromJson(filePath: string): any {
        console.log(`file path is: ${filePath}`)
        this._filePath = filePath;
        try {
            const result = execSync(`jsonnet ${filePath}`, {
                encoding: 'utf-8'
            });
            return JSON.parse(result);
        } catch (error) {
            console.error('No JSON data file is available. Please create one under at this path: ', this._filePath);
            throw error;
        }
    }

    public findFile(fileName: string, startDir: string): string | null {
        const files = fs.readdirSync(startDir);

        for (const file of files) {
            const fullPath = path.join(startDir, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                const found = this.findFile(fileName, fullPath);
                if (found) return found;
            } else if (file === fileName) {
                return fullPath;
            }
        }

        return null;
    }
}