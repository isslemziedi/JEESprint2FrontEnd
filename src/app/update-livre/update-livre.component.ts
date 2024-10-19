import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-livre',
  templateUrl: './update-livre.component.html',
  styles: []
})
export class UpdateLivreComponent implements OnInit {
  currentLivre = new Livre();
  genres!: Genre[];
  updatedGenreId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService
  ) {}

  ngOnInit(): void {
    // Fetch the list of genres first
    this.livreService.listeGenres().subscribe(gens => {
      this.genres = gens._embedded.genres;
      console.log('Fetched genres:', this.genres); // Log the fetched genres

      // After fetching genres, fetch the current livre
      this.livreService.consulterLivre(this.activatedRoute.snapshot.params['id']).subscribe(l => {
        this.currentLivre = l;
        console.log('Current livre:', this.currentLivre); // Log the current livre

        // Check if currentLivre has a genre and assign its ID
        if (this.currentLivre.genre) {
          this.updatedGenreId = this.currentLivre.genre.idGenre;
          console.log('Current livre genre ID:', this.updatedGenreId); // Log the genre ID
        } else {
          console.warn('Current livre does not have a genre defined');
        }
      });
    });
  }

  updateLivre() {
    // Ensure that updatedGenreId is defined before updating
    if (this.updatedGenreId) {
      // Find the genre based on updatedGenreId
      const selectedGenre = this.genres.find(g => g.idGenre === Number(this.updatedGenreId));
      
      // Check if the selected genre was found
      if (selectedGenre) {
        this.currentLivre.genre = selectedGenre; // Assign the genre to currentLivre
        
        // Proceed to update the livre
        this.livreService.updateLivre(this.currentLivre).subscribe(
          () => {
            this.router.navigate(['livres']); // Navigate back to the list
          },
          error => {
            console.error('Error updating livre:', error);
          }
        );
      } else {
        console.warn('Selected genre not found for ID:', this.updatedGenreId);
      }
    } else {
      console.warn('Updated genre ID is not defined. Cannot update livre.');
    }
  }
}
