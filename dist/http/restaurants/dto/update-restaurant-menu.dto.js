"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRestaurantMenuDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_restaurant_menu_dto_1 = require("./create-restaurant-menu.dto");
class UpdateRestaurantMenuDto extends (0, mapped_types_1.PartialType)(create_restaurant_menu_dto_1.CreateRestaurantMenuDto) {
}
exports.UpdateRestaurantMenuDto = UpdateRestaurantMenuDto;
//# sourceMappingURL=update-restaurant-menu.dto.js.map