import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  generalFailAlert() {
    Swal.fire({
      title: 'Failed!',
      text: 'Please try again later',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }

  FailAlert() {
    Swal.fire({
      title: 'Failed!',
      text: 'Your startup did not requested',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }

  SuccessAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Your startup requested successfully',
      icon: 'success',
      confirmButtonText: 'done',
    });
  }
  SuccessAlertMessage() {
    Swal.fire({
      title: 'Success!',
      text: 'Your message is sent',
      icon: 'success',
      confirmButtonText: 'done',
    });
  }

  pageNotFound() {
    Swal.fire({
      title: 'Failed!',
      text: 'Page not found',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }

  failUploadLogo() {
    Swal.fire({
      title: 'Failed!',
      text: 'Failed to upload logo try again, with smaller size or correct extension',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }
}
