import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../model/Heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(private heroeService:HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroeService.getHeroeById(id).subscribe( (resp: HeroeModel) =>{
        if(resp !== null)
        {
          this.heroe = resp;
          this.heroe.id = id;
        }
        
        return;
      });
    }
  }

  guardar(form: NgForm){
     
    let request : Observable<any>;

    if(form.invalid)
     {
      return;
     }
    
     this.FireAlert('Espere','Guardando','info', true);

     if(this.heroe.id)
     {
      request = this.heroeService.actualizarHeroe(this.heroe);
     }
     else
     {
      request = this.heroeService.crearHeroe(this.heroe);
     }

     request.subscribe(resp => {
      this.FireAlert(this.heroe.nombre,'Se actualizo correctamente','success',true);
     })
  }

  private FireAlert(title: string, text: string, icon: any, outsideClick: boolean) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      allowOutsideClick: true
    });
    Swal.showLoading();
  }
}
