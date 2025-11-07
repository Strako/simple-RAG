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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloworldService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const dto_1 = require("./dto");
let HelloworldService = class HelloworldService {
    httpService;
    helloRepository;
    cacheManager;
    constructor(httpService, helloRepository, cacheManager) {
        this.httpService = httpService;
        this.helloRepository = helloRepository;
        this.cacheManager = cacheManager;
    }
    async getHello() {
        const greeting = await this.helloRepository
            .createQueryBuilder('hello')
            .getOne();
        const result = new dto_1.HelloworldResponseDto(greeting?.description ?? 'Hi');
        return result;
    }
};
exports.HelloworldService = HelloworldService;
exports.HelloworldService = HelloworldService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Helloworld)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_2.Repository, Object])
], HelloworldService);
//# sourceMappingURL=helloworld.service.js.map