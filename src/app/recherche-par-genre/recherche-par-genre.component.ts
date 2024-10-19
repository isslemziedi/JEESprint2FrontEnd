import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: []
})
export class RechercheParGenreComponent implements OnInit {
  livres!: Livre[];
  IdG!: number;      
  genres!: Genre[]; 

  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.livreService.listeGenres().subscribe(gens => {this.genres = gens._embedded.genres;
    console.log(gens);
});
  }



  onChange(): void {
    console.log('Selected Genre ID:', this.IdG);
    this.livreService.rechercherParGenre(this.IdG).subscribe(
        livs => {
            this.livres = livs;
            console.log('Livres for selected genre:', livs);
        },
        error => {
            console.error('Error fetching livres:', error); 
        }
    );
}

}
