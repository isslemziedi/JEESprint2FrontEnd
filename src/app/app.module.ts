import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LivresComponent } from './livres/livres.component'; 
import { AddLivreComponent } from './add-livre/add-livre.component';
import { FormsModule } from '@angular/forms';
import { UpdateLivreComponent } from './update-livre/update-livre.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component'; 
import { HttpClientModule,HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component'; // Import HttpClientModule
import { AuthService } from './services/auth.service';
import { LivreService } from './services/livre.service';
import { TokenInterceptor } from './services/token.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    LivresComponent,
    AddLivreComponent,
    UpdateLivreComponent,
    RechercheParGenreComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    UpdateGenreComponent,
    ListeGenresComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule here
  ],
  providers: [AuthService,LivreService,provideHttpClient(withFetch()) ,
              {provide : HTTP_INTERCEPTORS,
              useClass : TokenInterceptor,
              multi : true}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
