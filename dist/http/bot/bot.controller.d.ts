import { BotService } from './bot.service';
interface IRequestStep3 {
    category: string;
}
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    step1(): Promise<{
        message: string;
    }>;
    step2(): Promise<{
        message: string;
        options: string;
    }>;
    step3(req: IRequestStep3): Promise<{
        message: string;
        options: string;
        additionalCount: number;
    }>;
}
export {};
