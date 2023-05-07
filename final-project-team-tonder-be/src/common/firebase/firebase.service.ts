import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;
  private readonly bucket: Bucket;
  constructor() {
    const config: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    admin.initializeApp({
      credential: admin.credential.cert(config),

      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

    this.bucket = admin.storage().bucket();
  }

  async uploadFile(fileBuffer: Buffer, path: string): Promise<string> {
    const file = this.bucket.file(path);
    await file.save(fileBuffer, { contentType: 'image/jpeg' });
    const url = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });
    return url[0];
  }
}
