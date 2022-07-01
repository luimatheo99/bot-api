"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRestaurantCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_restaurant_category_dto_1 = require("./create-restaurant-category.dto");
class UpdateRestaurantCategoryDto extends (0, mapped_types_1.PartialType)(create_restaurant_category_dto_1.CreateRestaurantCategoryDto) {
}
exports.UpdateRestaurantCategoryDto = UpdateRestaurantCategoryDto;
//# sourceMappingURL=update-restaurant-category.dto.js.map