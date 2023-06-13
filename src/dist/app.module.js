"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var throttler_1 = require("@nestjs/throttler");
var typeorm_1 = require("@nestjs/typeorm");
var redisStore = require("cache-manager-redis-store");
var auth_module_1 = require("./applications/auth/auth.module");
var email_module_1 = require("./applications/emails/email.module");
var franchises_module_1 = require("./applications/franchises/franchises.module");
var stores_module_1 = require("./applications/stores/stores.module");
var tumbler_records_module_1 = require("./applications/tumbler-records/tumbler-records.module");
var users_module_1 = require("./applications/users/users.module");
var cloud_aws_module_1 = require("./infrastructures/clouds/aws/cloud-aws.module");
var typeorm_config_1 = require("./infrastructures/database/config/typeorm.config");
var env_config_1 = require("./infrastructures/env-config/env-config");
var dynamic_gql_module_1 = require("./infrastructures/graphql/dynamic-gql.module");
var gql_throttler_guard_1 = require("./infrastructures/graphql/guards/gql.throttler.guard");
var health_check_controller_1 = require("./presentations/controllers/health-check.controller");
var ENV = process.env.NODE_ENV;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(env_config_1.configOptions),
                users_module_1.UserModule,
                auth_module_1.AuthModule,
                stores_module_1.StoresModule,
                franchises_module_1.FranchisesModule,
                cloud_aws_module_1.CloudAwsModule,
                dynamic_gql_module_1.DynamicGqlModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.ormOption),
                throttler_1.ThrottlerModule.forRoot({
                    ttl: 1,
                    limit: 10
                }),
                common_1.CacheModule.register({
                    store: redisStore,
                    isGlobal: true,
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                    ttl: 120
                }),
                tumbler_records_module_1.TumblerRecordsModule,
                email_module_1.EmailModule,
            ],
            providers: [
                {
                    provide: 'NODE_ENV',
                    useValue: ENV
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: gql_throttler_guard_1.GqlThrottlerGuard
                },
            ],
            controllers: [health_check_controller_1.HealthCheckController]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
