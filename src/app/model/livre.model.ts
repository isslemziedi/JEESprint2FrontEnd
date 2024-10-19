import { Genre } from "./genre.model";

export class Livre {
    idLivre? : number;
    nomLivre? : string;
    nomAuteur? : string;
    prixLivre? : number;
    datePublication? : Date ;
    genre! : Genre;
}