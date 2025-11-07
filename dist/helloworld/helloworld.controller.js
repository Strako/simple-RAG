"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloworldController = void 0;
const common_1 = require("@nestjs/common");
const helloworld_service_1 = require("./helloworld.service");
const swagger_1 = require("@nestjs/swagger");
const helloworld_response_dto_1 = require("./dto/helloworld-response.dto");
const decorators_1 = require("../common/decorators");
let HelloworldController = class HelloworldController {
    helloworldService;
    constructor(helloworldService) {
        this.helloworldService = helloworldService;
    }
    getHello() {
        return this.helloworldService.getHello();
    }
};
exports.HelloworldController = HelloworldController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('hi'),
    (0, swagger_1.ApiOperation)({ summary: 'Hello world endpoint' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: helloworld_response_dto_1.HelloworldResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelloworldController.prototype, "getHello", null);
exports.HelloworldController = HelloworldController = __decorate([
    (0, common_1.Controller)({
        path: '/',
        version: '1',
    }),
    (0, swagger_1.ApiTags)('Helloworld'),
    __metadata("design:paramtypes", [helloworld_service_1.HelloworldService])
], HelloworldController);
//# sourceMappingURL=helloworld.controller.js.map