import { Injectable } from '@angular/core';
import { Livre } from '../model/livre.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL, apiURLGenre } from '../config';
import { GenreWrapper } from '../model/GenreWrapped';
import { Genre } from '../model/genre.model';
const httpOptions = { headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class LivreService {
  livres! : Livre[]; 
  
  constructor(private http : HttpClient , private authService:AuthService) {
  }

  listeLivre(): Observable<Livre[]>{
    /*
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Livre[]>(apiURL+"/all",{headers:httpHeaders});
    */
    return this.http.get<Livre[]>(apiURL+"/all");
  }

  ajouterLivre( l: Livre):Observable<Livre>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Livre>(apiURL+"/addliv", l,{headers:httpHeaders});
  }

  supprimerLivre(id : number) {
      const url = `${apiURL}/delliv/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url,{headers:httpHeaders});
    }

  consulterLivre(id: number): Observable<Livre> {
      const url = `${apiURL}/getbyid/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Livre>(url,{headers:httpHeaders});
  }


    trierLivres(){
      this.livres = this.livres.sort((n1,n2) => {
      if (n1.idLivre! > n2.idLivre!) {
        return 1;
      }
      if (n1.idLivre! < n2.idLivre!) {
        return -1;
      }
      return 0;
      });
    }


    // consulterGenre(id:number): Genre{
    //   return this.genres.find(g => g.idGenre == id)!;
    // }

      updateLivre(l :Livre) : Observable<Livre>
      {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Livre>(apiURL + "/updateliv", l, { headers: httpHeaders });

      }



      listeGenres():Observable<GenreWrapper>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<GenreWrapper>(apiURLGenre,{headers:httpHeaders});
    }

      rechercherParGenre(idGenre: number):Observable<Livre[]> {
        const url = `${apiURL}/livresGenre/${idGenre}`;
        return this.http.get<Livre[]>(url);
      }

      rechercherParNom(nom: string):Observable< Livre[]> {
        const url = `${apiURL}/livresByName/${nom}`;
        return this.http.get<Livre[]>(url);
        }

        ajouterGenre( g: Genre):Observable<Genre>{
          return this.http.post<Genre>(apiURLGenre, g, httpOptions);
          }
}
