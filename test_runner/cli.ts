import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runCommand(command: string): Promise<void> {
    try {
        const { stdout, stderr } = await execAsync(command);
        console.log('Output:', stdout);
        if (stderr) {
            console.error('Errors:', stderr);
        }
    } catch (error) {
        console.error('Error executing command:', error);
    }
}

async function main() {
    const { testType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'testType',
            message: 'Select the type of test to run:',
            choices: [
                'Cucumber Tests',
                'API Tests',
                'UI Tests'
            ]
        }
    ]);

    switch (testType) {
        case 'Cucumber Tests':
            await runCommand('npx cucumber-js');
            break;
        case 'Run API Tests':
            await runCommand('npx playwright test e2e/api/prod-inc.spec.ts');
            break;
        case 'Run UI Tests':
            await runCommand('npm run test:ui');
            break;
    }
}

main().catch(console.error);
