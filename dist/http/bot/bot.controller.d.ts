import { BotService } from './bot.service';
interface IReqPhoneNumberTwillio {
    phoneNumberTwillio: string;
}
interface IReqStep3 {
    category: string;
    phoneNumberTwillio: string;
}
interface IReqStep31 {
    product: number;
    category: string;
    phoneNumberTwillio: string;
}
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    step1(req: IReqPhoneNumberTwillio): Promise<{
        message: string;
    }>;
    step2(req: IReqPhoneNumberTwillio): Promise<{
        message: string;
        options: string;
    }>;
    step3(req: IReqStep3): Promise<{
        message: string;
        options: string;
        additionalCount: number;
    }>;
    step31(req: IReqStep31): Promise<{
        message: string;
    }>;
}
export {};
