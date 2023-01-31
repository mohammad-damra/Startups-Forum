import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FirestorgeService {
  storPath = '/logos';
  clipFileName = uuid();
  startupLogoPath = `startups/${this.clipFileName}.png`;

  constructor(private _fireStorage: AngularFireStorage) {}
  upload(path: any): Observable<any> {
    this.storPath += new Date() + path;
    return this._fireStorage.upload(this.storPath, path).snapshotChanges(); //to get the link and data after uploading the file
  }

  getFileUrl(): Observable<any> {
    const fileRef = this._fireStorage.ref(this.storPath);

    return fileRef.getDownloadURL();
  }

  uploadDrag(file: File | null): Observable<any> {
    return this._fireStorage
      .upload(this.startupLogoPath, file)
      .snapshotChanges();
  }

  getDropFileURL() {
    const fileRefrence = this._fireStorage.ref(this.startupLogoPath);
    return fileRefrence.getDownloadURL();
  }
}
