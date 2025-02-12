import * as vscode from 'vscode';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

async function askGemini(prompt: string): Promise<string> {
    try {
        const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
            prompt: prompt,
            max_tokens: 100
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching from Gemini API", error);
        return "Error connecting to AI.";
    }
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('codeinsights', async () => {
        const input = await vscode.window.showInputBox({ prompt: "Ask Gemini AI" });
        if (input) {
            const response = await askGemini(input);
            vscode.window.showInformationMessage(response);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
