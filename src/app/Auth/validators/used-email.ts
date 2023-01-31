import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { AsyncValidator , AbstractControl ,ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class UsedEmail implements AsyncValidator {
    constructor(
        private _authFire:AngularFireAuth
    ){

    }
    //check if email exists in firebase

    validate = (control :AbstractControl) : Promise<ValidationErrors | null > =>{
      return   this._authFire.fetchSignInMethodsForEmail(control.value).then(
            res => res.length ? {emailUsed :true} :null
        )
    }
}
