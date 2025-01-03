import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { RecipesModule } from './recipes/recipes.module';
import { AwsBucketModule } from './aws-bucket/aws-bucket.module';

@Module({
  imports: [

    // Importamos el módulo ConfigModule de @nestjs/config para manejar las variables de configuración y entorno.
    // ConfigModule es un módulo que permite cargar y gestionar configuraciones de la aplicación.
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración esté disponible globalmente en toda la aplicación.
      load: [configuration], // Permite cargar funciones personalizadas o archivos que contienen configuraciones específicas.
      // En este caso, 'configuration' es una función que devuelve un objeto con las configuraciones de la aplicación.
      envFilePath: '.env' // Especifica la ruta del archivo donde se encuentran las variables de entorno.
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        {
          transport: {
            host: configService.get<string>('email_host'),
            port: configService.get<number>('email_port'),
            secure: true,
            auth: {
              user: configService.get<string>('auth_user'),
              pass: configService.get<string>('auth_pass'),
            },
          }
        }),
      inject: [ConfigService],
    }),


    // Importamos el módulo MongooseModule de @nestjs/mongoose para manejar la conexión con MongoDB.
    // Se utiliza `forRootAsync` para configurar la conexión de forma asíncrona,
    // lo que permite esperar las dependencias necesarias antes de establecer la conexión.
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importamos el módulo ConfigModule para acceder a las variables de entorno o configuraciones.

      useFactory: async (configService: ConfigService) => ({
        // La función `useFactory` es una fábrica asíncrona que devuelve la configuración de conexión.
        uri: configService.get<string>('mongo_url_db'),
        // `configService.get<string>('mongo_url_db')` obtiene la URL de conexión a MongoDB
        // desde las variables de entorno a través del ConfigService.
      }),
      inject: [ConfigService], // Inyectamos el servicio ConfigService para poder acceder a las configuraciones.
    }),


    UsersModule,
    AuthModule,
    NodemailerModule,
    RecipesModule,
    AwsBucketModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule { }
