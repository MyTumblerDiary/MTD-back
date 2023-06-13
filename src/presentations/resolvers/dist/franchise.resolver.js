"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FranchisesResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var franchise_entity_1 = require("src/applications/franchises/entities/franchise.entity");
var gql_auth_guard_1 = require("src/commons/auth/gql-auth.guard");
var FranchisesResolver = /** @class */ (function () {
    function FranchisesResolver(franchisesService) {
        this.franchisesService = franchisesService;
    }
    FranchisesResolver.prototype.franchises = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService.findAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FranchisesResolver.prototype.franchise = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService.findOne(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FranchisesResolver.prototype.franchisesBySearch = function (searchInput) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService.search(searchInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FranchisesResolver.prototype.createFranchise = function (createFranchiseInput) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService.create(createFranchiseInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FranchisesResolver.prototype.updateFranchise = function (id, updateFranchiseInput) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService.update(id, updateFranchiseInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FranchisesResolver.prototype.deleteFranchise = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.franchisesService["delete"](id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Query(function () { return [franchise_entity_1.Franchise]; }, {
            name: 'franchises',
            description: '모든 프렌차이즈를 조회합니다. '
        })
    ], FranchisesResolver.prototype, "franchises");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Query(function () { return franchise_entity_1.Franchise; }, {
            name: 'franchise',
            description: 'id로 하나의 프렌차이즈를 조회합니다. '
        }),
        __param(0, graphql_1.Args('id'))
    ], FranchisesResolver.prototype, "franchise");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Query(function () { return [franchise_entity_1.Franchise]; }, {
            name: 'franchisesBySearch',
            description: '검색 조건에 맞는 프렌차이즈를 조회합니다. '
        }),
        __param(0, graphql_1.Args('searchInput'))
    ], FranchisesResolver.prototype, "franchisesBySearch");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return franchise_entity_1.Franchise; }, {
            name: 'createFranchise',
            description: '프렌차이즈를 생성합니다. '
        }),
        __param(0, graphql_1.Args('createFranhiseInput'))
    ], FranchisesResolver.prototype, "createFranchise");
    __decorate([
        graphql_1.Mutation(function () { return franchise_entity_1.Franchise; }, {
            name: 'updateFranchise',
            description: '프렌차이즈를 수정합니다. '
        }),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('updateFranchiseInput'))
    ], FranchisesResolver.prototype, "updateFranchise");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return Boolean; }, {
            name: 'deleteFranchise',
            description: '프렌차이즈를 삭제합니다. '
        }),
        __param(0, graphql_1.Args('id'))
    ], FranchisesResolver.prototype, "deleteFranchise");
    FranchisesResolver = __decorate([
        graphql_1.Resolver('Franchise')
    ], FranchisesResolver);
    return FranchisesResolver;
}());
exports.FranchisesResolver = FranchisesResolver;
