import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipesModule } from './recipes/recipes.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      csrfPrevention: false,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env'
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        {
        transport : {
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_url_db'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    NodemailerModule,
    RecipesModule,
    ImagesModule
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
