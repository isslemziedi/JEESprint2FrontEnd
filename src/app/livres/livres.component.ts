import { Component, OnInit } from '@angular/core';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css'
})
export class LivresComponent implements OnInit {

  livres? : Livre[]; 

  constructor(private livreService: LivreService , public authService: AuthService) {
    //this.livres=[];
   }
   
  ngOnInit(): void {
    this.chargerLivres();
  }


  chargerLivres(){
    this.livreService.listeLivre().subscribe(l => {
    console.log(l);
    this.livres = l;
    });
  }
    
  supprimerLivre(l: Livre) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf && l.idLivre !== undefined) { 
      this.livreService.supprimerLivre(l.idLivre).subscribe(() => {
        console.log("Livre supprimé");
        this.chargerLivres(); 
      });
    }

}
}
 