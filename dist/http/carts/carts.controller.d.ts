import { CartsService } from './carts.service';
interface IReqCreate {
    phoneNumberMessageBird: string;
    phoneNumberCustomer: string;
    category: string;
    product: string;
    additional: string;
    observation: string;
}
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(req: IReqCreate): Promise<void>;
}
export {};
