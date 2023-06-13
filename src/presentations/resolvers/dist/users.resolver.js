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
exports.UserResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var common_1 = require("@nestjs/common");
var user_entity_1 = require("src/applications/users/entities/user.entity");
var gql_auth_guard_1 = require("src/commons/auth/gql-auth.guard");
var gql_user_param_1 = require("src/commons/auth/gql-user.param");
var UserResolver = /** @class */ (function () {
    function UserResolver(userService) {
        this.userService = userService;
    }
    UserResolver.prototype.createUser = function (createUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.create(createUserInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.updateUser = function (user, updateUserInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.updateUser(user, updateUserInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.deleteUser = function (user) {
        return this.userService.deleteUser(user);
    };
    UserResolver.prototype.checkEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.checkEmail(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.checkNickname = function (nickname) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.checkNickname(nickname)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.resetPassword = function (userEmail, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.resetPassword(userEmail, password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.user = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.getUser(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }, {
            description: '회원가입'
        }),
        __param(0, graphql_1.Args('createUserInput'))
    ], UserResolver.prototype, "createUser");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return user_entity_1.User; }, {
            description: '유저정보 수정'
        }),
        __param(0, gql_user_param_1.CurrentUser('user')),
        __param(1, graphql_1.Args('updateUserInput'))
    ], UserResolver.prototype, "updateUser");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return Boolean; }, {
            description: '유저정보 삭제'
        }),
        __param(0, gql_user_param_1.CurrentUser('user'))
    ], UserResolver.prototype, "deleteUser");
    __decorate([
        graphql_1.Query(function () { return Boolean; }, {
            description: '중복 이메일 확인'
        }),
        __param(0, graphql_1.Args('email'))
    ], UserResolver.prototype, "checkEmail");
    __decorate([
        graphql_1.Query(function () { return Boolean; }, {
            description: '닉네임 중복 확인'
        }),
        __param(0, graphql_1.Args('nickname'))
    ], UserResolver.prototype, "checkNickname");
    __decorate([
        graphql_1.Mutation(function () { return user_entity_1.User; }, {
            description: '이메일 인증후 비밀번호 수정하기'
        }),
        __param(0, graphql_1.Args('userEmail')),
        __param(1, graphql_1.Args('password'))
    ], UserResolver.prototype, "resetPassword");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Query(function () { return user_entity_1.User; }, {
            description: '유저 정보 가져오기'
        }),
        __param(0, gql_user_param_1.CurrentUser('user'))
    ], UserResolver.prototype, "user");
    UserResolver = __decorate([
        graphql_1.Resolver('User')
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
