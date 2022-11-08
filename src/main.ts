import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as root from 'app-root-path';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const service = config.get('PROJECT_NAME');
    const port = config.get('PROJECT_PORT');

    if (!fs.existsSync(`${root}/../imports`)) {
        const getPathImports = config.get('PATH_IMPORTS');
        const getPathAllocations = config.get('PATH_ALLOCATIONS');
        const getPathCoupons = config.get('PATH_COUPONS');
        const getPathErrors = config.get('PATH_ERRORS');
        const pathImports = `${root}/..${getPathImports}`;
        const pathAllocations = `${root}/..${getPathAllocations}`;
        const pathCoupons = `${root}/..${getPathCoupons}`;
        const pathErrors = `${root}/..${getPathErrors}`;
        if (!fs.existsSync(`${pathImports}` && `${pathAllocations}` && `${pathCoupons}` && `${pathErrors}`)) {
            const generateDirectory = [`${pathImports}`, `${pathAllocations}`, `${pathCoupons}`, `${pathErrors}`];
            generateDirectory.forEach((v) => {
                fs.mkdirSync(v, { recursive: true });
            });
        }
    }

    await app.listen(port, () => {
        console.log(`${service} running on port ${port}`);
    });
}
bootstrap();
