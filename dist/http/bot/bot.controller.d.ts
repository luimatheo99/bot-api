import { BotService } from './bot.service';
interface IReqPhoneNumberMessageBird {
    phoneNumberMessageBird: string;
}
interface IReqStep3 {
    category: string;
    phoneNumberMessageBird: string;
}
interface IReqStep301 extends IReqStep3 {
    product: string;
}
interface IReqStep302 extends IReqStep301 {
    additional: string;
}
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    step1(req: IReqPhoneNumberMessageBird): Promise<{
        messageStep1: string;
    }>;
    step2(req: IReqPhoneNumberMessageBird): Promise<{
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
    step302(req: IReqStep302): Promise<{
        message: string;
    }>;
}
export {};
