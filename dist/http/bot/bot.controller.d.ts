import { BotService } from './bot.service';
interface IReqChannelId {
    channelId: string;
}
interface IReqStep3 {
    category: string;
    channelId: string;
}
interface IReqStep301 extends IReqStep3 {
    product: string;
    additional: string;
    additionalCount: string;
}
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    step1(req: IReqChannelId): Promise<{
        messageStep1: string;
    }>;
    step2(req: IReqChannelId): Promise<{
        messageStep2: string;
        optionsStep2: string;
    }>;
    step3(req: IReqStep3): Promise<{
        messageStep3: string;
        optionsStep3: string;
        additionalCountStep3: number;
    }>;
    step301(req: IReqStep301): Promise<{
        messageStep301: string;
    }>;
    step31(req: IReqStep301): Promise<{
        messageStep31: string;
    }>;
}
export {};
