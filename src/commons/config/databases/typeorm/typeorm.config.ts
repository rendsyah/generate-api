import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

export class TypeOrmConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mariadb',
            host: this.configService.get<string>('PROJECT_DB_HOST'),
            port: +this.configService.get<string>('PROJECT_DB_PORT'),
            username: this.configService.get<string>('PROJECT_DB_USER'),
            password: this.configService.get<string>('PROJECT_DB_PASS'),
            database: this.configService.get<string>('PROJECT_DB_NAME'),
            synchronize: false,
            connectTimeout: 30000,
            entities: [join(__dirname, '/../../../../modules/**/*.entity{.ts,.js}')],
        };
    }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return new TypeOrmConfig(configService).createTypeOrmOptions();
    },
    inject: [ConfigService],
};
