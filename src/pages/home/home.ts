import { Component } from '@angular/core';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = []
  audio = new Audio();
  audioDuracion: any;
  ordering: boolean = false

  constructor() {
    this.animales = ANIMALES.slice(0)
  }

  private pauseAudio ( animalSel:Animal ) {
      clearTimeout( this.audioDuracion )
      this.audio.pause()
      this.audio.currentTime = 0;

      for( let animal of this.animales ){
        if(animal.nombre !== animalSel.nombre)
          animal.reproduciendo = false
      }
  }

  playSound ( animal:Animal ) {

    this.pauseAudio(animal)

    if( animal.reproduciendo ) {
        animal.reproduciendo = false
        return
    }

    this.audio.src = animal.audio
    this.audio.load()
    this.audio.play()
    animal.reproduciendo = true

    this.audioDuracion = setTimeout( () => animal.reproduciendo= false, animal.duracion * 1000)
  }

  deleteAnimal ( index:number ) {
    this.animales.splice(index, 1)
  }

  refreshAnimals ( refresher:Refresher ){
    setTimeout( () => {
      this.animales = ANIMALES.slice(0)
      refresher.complete()
    }, 1000)
  }

  reorderAnimals ( idx:any ) {
    this.animales = reorderArray( this.animales, idx )
  }

}
