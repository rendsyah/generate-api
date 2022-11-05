import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const service = config.get('APP_NAME');
    const port = config.get('APP_PORT');

    await app.listen(port, () => {
        console.log(`${service} running on port ${port}`);
    });
}
bootstrap();
