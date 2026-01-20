import fs from 'fs';
import path from 'path';

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
        this._filePath = filePath;
        try {
            const data = fs.readFileSync(this._filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('No JSON data file is available. Please create one under at this path: ', this._filePath);
            return null;
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