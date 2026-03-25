import { test } from '../fixtures/test-fixture';

let stepStack: number[] = []

function formatStepName(template: string, args: any[]) {
    return template.replace(/{(\d+)}/g, (_, index) => {
        return args[index] !== undefined ? String(args[index]) : `{${index}}`;
    });
}

export function step(stepName?: string) {
    return function (
        target: any,
        context: ClassMethodDecoratorContext
    ) {
        const methodName = String(context.name);

        return async function (this: any, ...args: any[]) {
            const testInfo = this.testInfo;
            const logger = this.logger
            if (!testInfo) {
                return await target.call(this, ...args); // Fallback nếu ko có testInfo
            }

            if (!testInfo._stepCounter) {
                testInfo._stepCounter = [0]
            }
            const counter = testInfo._stepCounter
            counter[counter.length - 1]++ //Tăng số thứ tự level hiện tại
            const currentId = counter.join('.');
            //console.log('this:', this);

            let name = stepName || `${target.constructor.name}.${methodName}`;

            if (stepName) {
                name = formatStepName(stepName, args);
            }
            return await test.step(`${currentId}: ${name}`, async () => {
                counter.push(0);
                try {
                    logger?.info(`▶ ${name}`);
                    //return await target.apply(this, ...args);
                    return await target.call(this, ...args);
                }
                catch (error: any){
                    logger?.error(`❌ ${name}`);
                    logger?.error(error);
                    logger?.info(`▶ Capturing failed image at afterEach hook}`);
                    throw error;

                }
                finally {
                    counter.pop();
                }
            });
        }
    };
}