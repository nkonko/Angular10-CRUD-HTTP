import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/model/Heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe(resp =>
      { 
      this.heroes = resp, 
      this.cargando = false
    });
  }

  borrar(heroe: HeroeModel, i: number)
  {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then(resp => {
      
      if(resp.value)
      {
        this.heroes.splice(i,1);
        this.heroesService.borarHeroe(heroe.id).subscribe();
      }

    });
  }

}
