import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService, FirebaseAuthStrategy],
  exports: [FirebaseService, FirebaseAuthStrategy],
})
export class FirebaseModule {}
