import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions, MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

export class MongooseConfig implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('PROJECT_MONGO_DB_HOST'),
            connectTimeoutMS: 30000,
        };
    }
}

export const MongooseConfigAsync: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        return new MongooseConfig(configService).createMongooseOptions();
    },
    inject: [ConfigService],
};
