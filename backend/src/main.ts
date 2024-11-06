import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const whitelist = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
];


(async () => {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: whitelist,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Video call hub')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addTag('PVG')
        .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(
        process.env.APP_HTTP_PORT || '3000',
        () => console.log(`server started on PORT ${process.env.APP_HTTP_PORT}`)
    );
})();
