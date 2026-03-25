import { TestInfo } from '@playwright/test';
import 'dotenv/config';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
    'DEBUG': 0,
    'INFO': 1,
    'WARN': 2,
    'ERROR': 3
};

function resolveLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL as LogLevel | undefined;

    if (level && ['DEBUG', 'INFO', 'WARN', 'ERROR'].includes(level)) {
        return level;
    }

    return 'INFO';
}

type LoggerOptions = {
    testInfo?: TestInfo;
    logLevel?: LogLevel;
}

export class Logger {
    private logLevel: LogLevel = 'INFO';
    private testInfo?: TestInfo;

    // constructor(testInfo: TestInfo, logLevel: LogLevel) {
    //     this.testInfo = testInfo;
    //     this.logLevel = logLevel;
    // }

    constructor(options: LoggerOptions = {}){
        this.testInfo = options.testInfo;
        this.logLevel = options.logLevel ?? resolveLogLevel(); 
    }

    private shouldLog(level: LogLevel) {
        return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.logLevel];
    }

    private format(level: LogLevel, message: any) {
        const msg =
            typeof message === 'object'
                ? JSON.stringify(message, null, 2)
                : message;
        if (typeof message === 'string') {
            message = message.replace(/password:\s*\S+/gi, 'password: ******');
        }

        return `[${level.toUpperCase()}] ${msg}`;
    }

    private async write(level: LogLevel, message: any) {
        if (!this.shouldLog(level)) return;

        const msg = this.format(level, message);

        console.log(msg);

        // Optional: attach log vào report (chỉ cho warn + error)
        if (level === 'WARN' || level === 'ERROR') {
            if(this.testInfo){

            }
            
        }
    }

    log(message: any) {
        const msg = `[${this.testInfo?.title}] ${message}`;
        console.log(msg);
    }

    debug(message: any) {
        return this.write('DEBUG', message);
    }

    info(message: any) {
        return this.write('INFO', message);
    }

    warn(message: any) {
        return this.write('WARN', message);
    }

    error(message: any) {
        return this.write('ERROR', message);
    }

}