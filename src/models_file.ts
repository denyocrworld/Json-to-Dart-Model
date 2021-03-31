import { window, workspace } from "vscode";
import { printLine } from "./syntax";
import * as fs from "fs";

export class Models {
    private fileName: string = "/models.jsonc";

    get directory() {
        return workspace.rootPath;
    }

    get file(): string {
        return this.directory + this.fileName;
    }

    get exist(): boolean {
        return fs.existsSync(this.file);
    }

    get data(): string {
        return fs.readFileSync(this.file, 'utf-8');
    }

    private toString() {
        let sb = '';
        sb += printLine('// GENERATED CODE - READ DOCUMENTATION BEFORE CONFIGURATION');
        sb += printLine('[', true);
        sb += printLine('// **************************************************************************', true, 1);
        sb += printLine('// Json To Dart Model Configuration', true, 1);
        sb += printLine('// **************************************************************************', true, 1);
        sb += printLine('//', true, 1);
        sb += printLine('// Useful links to work with this file:', true, 1);
        sb += printLine('// About jsonc: https://github.com/onury/jsonc.', true, 1);
        sb += printLine('// Try jsonc: https://komkom.github.io/', true, 1);
        sb += printLine('{', true, 1);
        sb += printLine('// Generates Freezed classes.', true, 2);
        sb += printLine('// If it\'s true, everything below will be ignored because Freezed supports them all.', true, 2);
        sb += printLine('"freezed": false,', true, 2);
        sb += printLine('// Enable Json Serializable builder.', true, 2);
        sb += printLine('"serializable": false,', true, 2);
        sb += printLine('// Enable Equatable support.', true, 2);
        sb += printLine('// If it\'s true, equality operator and immutability will be ignored', true, 2);
        sb += printLine('"equatable": false,', true, 2);
        sb += printLine('// Generate immutable classes.', true, 2);
        sb += printLine('"immutable": false,', true, 2);
        sb += printLine('// Add toString method to improve the debugging experience.', true, 2);
        sb += printLine('"toString": false,', true, 2);
        sb += printLine('// Add copyWith method (Recommended with immutable classes).', true, 2);
        sb += printLine('"copyWith": false,', true, 2);
        sb += printLine('// Add equality operator', true, 2);
        sb += printLine('"equality": false', true, 2);
        sb += printLine('// Default target directory.', true, 2);
        sb += printLine('"targetdirectory": "/lib/models"', true, 2);
        sb += printLine('}', true, 1);
        sb += printLine('// Add your json objects here separated by commas.', true, 1);
        sb += printLine('// Configuration item must be first in the list.', true, 1);
        sb += printLine('// Note that you add class names to each object with key "__className":', true, 1);
        sb += printLine('// And avoid duplicate class names in this list for best results.', true, 1);
        sb += printLine('// FOR EXAMPLE:', true, 1);
        sb += printLine('/*\n', true, 1);
        sb += printLine('{', true, 1);
        sb += printLine('"__className": "UserPost",', true, 2);
        sb += printLine('"userId": 1,', true, 2);
        sb += printLine('"id": 1,', true, 2);
        sb += printLine('"title": "Json To Dart Model",', true, 2);
        sb += printLine('"body": "Json to Dart advanced..."', true, 2);
        sb += printLine('}\n', true, 1);
        sb += printLine('*/', true, 1);
        sb += printLine(']', true);
        return sb;
    }

    async duplicatesClass(objects: any[]): Promise<string[]> {
        return objects.map((o) => {
            const { ['__className']: className } = o;
            return className;
        }).filter((n, i, arr) => arr.indexOf(n) !== i);
    }

    async create(): Promise<void> {
        let accepted = await askForFileCreation();
        if (accepted) {
            fs.writeFile(this.file, this.toString(), "utf8", (err) => {
                if (err) {
                    return console.error(err);
                }
                window.showInformationMessage("models.jsonc file was created for the first time.");
                return;
            });
        }
    }
}

async function askForFileCreation(): Promise<boolean> {
    const selection = await window.showQuickPick(
        [
            {
                label: "No",
                picked: false,
            },
            { label: "Yes" },
        ],
        { placeHolder: "models.jsonc file not found. Do you want it to be created for you?" }
    );

    switch (selection?.label) {
        case "Yes":
            return true;
        default:
            return false;
    }
}