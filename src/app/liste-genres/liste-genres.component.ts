import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { LivreService } from '../services/livre.service'; 
import { catchError } from 'rxjs/operators'; 
import { of } from 'rxjs'; 

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: [],
})
export class ListeGenresComponent implements OnInit {
  genres!: Genre[]; 
  updatedGenre:Genre = {"idGenre":0,"nomGenre":"","descGenre":""};
  ajout:boolean=true;

  constructor(private livreService: LivreService) {} 

  ngOnInit(): void {
    this.livreService.listeGenres().pipe(
      catchError(error => {
        console.error('Error fetching genres:', error);
        return of({ _embedded: { genres: [] }}); 
      })
    ).subscribe(
      gens => {
        this.genres = gens._embedded.genres; 
        console.log(gens); 
      }
    );
  }


  chargerGenres(){
    this.livreService.listeGenres().
    subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
    });
    }

  genreUpdated(g:Genre){
    console.log("Genre updated event",g);
    this.livreService.ajouterGenre(g).
     subscribe( ()=> this.chargerGenres());
    }


    updateGenre(g:Genre) {
      this.updatedGenre=g;
      this.ajout=false;
      }

}
