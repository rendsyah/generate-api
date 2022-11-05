import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

// @Injectable()
// export class MongooseService {
//     constructor(private config: ConfigService) {}

//     mongooseOptions(): MongooseModuleOptions {
//         return {
//             uri: this.config.get('COUPON_DB_HOST'),
//             auth: {
//                 username: this.config.get('COUPON_DB_NAME'),
//                 password: this.config.get('COUPON_DB_PASS'),
//             },
//             dbName: this.config.get('COUPON_DB_NAME'),
//             replicaSet: this.config.get('COUPON_DB_REPLICA'),
//             connectTimeoutMS: 30000,
//         };
//     }
// }
