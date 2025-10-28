import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home.component';
import { CategoriesPageComponent } from './pages/categories/categories.component';
import { FavoritesPageComponent } from './pages/favorites/favorites.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { ContactPageComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'JabesFilms | Inicio' },
  { path: 'categories', component: CategoriesPageComponent, title: 'JabesFilms | Categorías' },
  { path: 'favorites', component: FavoritesPageComponent, title: 'JabesFilms | Favoritas' },
  { path: 'blog', component: BlogPageComponent, title: 'JabesFilms | Blog' },
  { path: 'contact', component: ContactPageComponent, title: 'JabesFilms | Contacto' },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada' }
];
