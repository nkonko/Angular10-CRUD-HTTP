import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../model/Heroe.model';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-6f0c8.firebaseio.com';
  
  constructor(private http: HttpClient) { }
  
  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(map((resp: any)=>{
      heroe.id = resp.name;
      return heroe;
    }));
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = { ...heroe }; 
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(map(resp => this.crearLista(resp)))
  }

  getHeroeById(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  borarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

  private crearLista(resp: Object) {
    const heroes: HeroeModel[] = [];

    if(resp === null)
    {
      return [];
    }

    Object.entries(resp).forEach(([k,v]) =>
      {
        let heroe = new HeroeModel();
        heroe = v
        heroe.id = k

        heroes.push(heroe);
      });
    return heroes;
  }
}
