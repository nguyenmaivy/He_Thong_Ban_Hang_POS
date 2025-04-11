import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '123456789',
      database: 'He_Thong_Ban_Hang_POS',
      entities: [User],
      synchronize: false, 
      extra: {
        trustServerCertificate: true,
      },
    }),
    AuthModule, 
  ],
})
export class AppModule {}
