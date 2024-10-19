import { Component, OnInit } from '@angular/core';
import { LivreService } from '../services/livre.service';
import { Livre } from '../model/livre.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit{

  nomLivre! : string;
  livres!: Livre[];

  allLivres! : Livre[];
  searchTerm!: string;

  constructor( private livreService : LivreService){}

  ngOnInit(): void {
    this.livreService.listeLivre().subscribe(livs => {
      console.log(livs);
      this.livres = livs;
      });
  }


  rechercherLivs(){
    this.livreService.rechercherParNom(this.nomLivre).
    subscribe(livs => {
    this.livres = livs;
    console.log(livs)});
    }

    onKeyUp(filterText: string) {
      this.livres = this.allLivres.filter(item => 
        item.nomLivre && item.nomLivre.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    

}
