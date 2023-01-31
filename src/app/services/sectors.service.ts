import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
import ISector from '../models/sectors.modal';
@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  constructor(private db: AngularFireDatabase) {}

  getAllSectores() {
    return this.db
      .list('Sectors')
      .snapshotChanges()
      .pipe(
        map((change) =>
          change.map((obj) => ({
            key: obj.payload.key,
            ...obj.payload.exportVal(),
          }))
        )
      );
  }

  AddSector(form: ISector) {
    return this.db.list('/Sectors/').push({
      id: '',
      sectorName: form.sectorName,
      sectorLogo: form.sectorLogo,
      designColor: form.designColor,
      parentCategoryName: form.parentCategoryName,
    });
  }

  getSectorById(id: string) {
    return this.db
      .object('/Sectors/' + id)
      .valueChanges()
      .pipe(take(1));
  }

  update(id: string, sector: ISector) {
    return this.db.object('/Sectors/' + id).update({
      designColor: sector.designColor,
      parentCategoryName: sector.parentCategoryName,
      sectorLogo: sector.sectorLogo,
      sectorName: sector.sectorName,
    });
  }

  delete(id: string) {
    return this.db.object('/Sectors/' + id).remove();
  }
}
