import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum NodeEnvironment {
    Development = 'development',
    Production = 'production',
}

class DatabaseEnvironment {
    @IsEnum(NodeEnvironment)
    NODE_ENV: NodeEnvironment;

    @IsString()
    PROJECT_DB_HOST: string;

    @IsNumber()
    PROJECT_DB_PORT: number;

    @IsString()
    PROJECT_DB_USER: string;

    @IsString()
    PROJECT_DB_PASS: string;

    @IsString()
    PROJECT_DB_NAME: string;

    @IsString()
    PROJECT_MONGO_DB_HOST: string;
}

export function validate(config: Record<string, unknown>) {
    const configuration = plainToInstance(DatabaseEnvironment, config, { enableImplicitConversion: true });
    const errors = validateSync(configuration, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return configuration;
}
