import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-livre',
  templateUrl: './add-livre.component.html',
  styleUrl: './add-livre.component.css'
})
export class AddLivreComponent implements OnInit {
  newLivre = new Livre();
  message: string ="";
  genres! : Genre[];
  newIdGenre! : number;
  newGenre! : Genre;

  constructor(private livreService: LivreService,private router :Router) { }

  ngOnInit(): void {
    this.livreService.listeGenres().subscribe(
      gens => {console.log(gens);
      this.genres = gens._embedded.genres;});
  }
  addLivre(){
    this.newLivre.genre = this.genres.find(g => g.idGenre == this.newIdGenre)!;
    this.livreService.ajouterLivre(this.newLivre).subscribe(l => {console.log(l);
      this.router.navigate(['livres']);
    });

  }


    
 

}
