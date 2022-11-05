import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mariadb',
            host: configService.get<string>('PROJECT_DB_HOST'),
            port: +configService.get<string>('PROJECT_DB_PORT'),
            username: configService.get<string>('PROJECT_DB_USER'),
            password: configService.get<string>('PROJECT_DB_PASS'),
            database: configService.get<string>('PROJECT_DB_NAME'),
            synchronize: false,
            connectTimeout: 30000,
            entities: [join(__dirname + '/../../../modules/**/*.entity{.ts,.js}')],
        };
    }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService],
};
