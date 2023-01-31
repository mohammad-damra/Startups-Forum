import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IStartup from '../models/startup.modal';

@Injectable({
  providedIn: 'root',
})
export class StartupsService {
  constructor(private db: AngularFireDatabase) {}

  getAllStartups() {
    return this.db
      .list('Startups')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({
            key: obj.payload.key,
            ...obj.payload.exportVal(),
          }))
        )
      );
  }

  getStartupById(id: string) {
    return this.db.object('/Startups/' + id).valueChanges();
  }

  AddStartup(form: IStartup): Observable<any> {
    return from(
      this.db.list('/Startups/').push({
        id: '',
        startupName: form.startupName,
        startupCity: form.startupCity,
        sectorName: form.sectorName,
        founderName: form.founderName,
        numberOfEmployee: form.numberOfEmployee,
        yearOfEstablishment: form.yearOfEstablishment,
        websiteURL: form.websiteURL,
        emailAddress: form.emailAddress,
        startupLogo: form.startupLogo,
        isApproved: false,
        description: form.description,
        coverImg: form.coverImg,
      })
    );
  }

  update(id: string, startup: IStartup) {
    return this.db.object('/Startups/' + id).update({
      startupName: startup.startupName,
      startupCity: startup.startupCity,
      sectorName: startup.sectorName,
      founderName: startup.founderName,
      numberOfEmployee: startup.numberOfEmployee,
      yearOfEstablishment: startup.yearOfEstablishment,
      websiteURL: startup.websiteURL,
      emailAddress: startup.emailAddress,
      startupLogo: startup.startupLogo,
      isApproved: startup.isApproved,
      description: startup.description,
      coverImg: startup.coverImg,
    });
  }

  delete(id: string) {
    return this.db.object('/Startups/' + id).remove();
  }

  approvedStartups() {
    return this.db
      .list('Startups', (ref) => ref.orderByChild('isApproved').equalTo(true))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({
            key: obj.payload.key,
            ...obj.payload.exportVal(),
          }))
        )
      );
  }
}
