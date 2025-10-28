import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesPageComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const favorites = this.moviesService.getFavorites();
    this.favoriteMovies = this.moviesService
      .getAll()
      .filter((movie) => favorites.has(movie.id));
  }

  removeFavorite(movie: Movie): void {
    this.moviesService.toggleFavorite(movie.id);
    this.loadFavorites();
  }

  trackById(_: number, movie: Movie): string {
    return movie.id;
  }
}
