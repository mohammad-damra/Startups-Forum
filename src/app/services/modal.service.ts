import { Injectable } from '@angular/core';

interface IModal {
  id:string,
  visibile:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals:IModal[]=[];

  constructor() { }

  // id system for singlton the modal
  register(id:string){
    this.modals.push({
      id,
      visibile:false
    })
  }

  isModalOpen(id:string):boolean{
    return !!this.modals.find((element)=>element.id === id)?.visibile
  }

  toggleModal(id:string){
    const modal = this.modals.find((element)=>element.id === id);
    if(modal){
      modal.visibile= !modal.visibile
    }
  }

  //Destroying the modal (fixing the memory leak)

  unregister(id:string){
    this.modals = this.modals.filter(element => element.id !== id)
  }

}
