import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

type SortMode = 'recent' | 'rating' | 'alpha';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesPageComponent implements OnInit {
  genres: string[] = [];
  selectedGenre = 'all';
  sortMode: SortMode = 'recent';

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  get currentGenreLabel(): string {
    return this.selectedGenre === 'all' ? 'Todos los géneros' : this.selectedGenre;
  }

  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit(): void {
    this.genres = ['all', ...this.moviesService.getGenres()];
    this.movies = this.moviesService.getAll();
    this.applyFilters();
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.applyFilters();
  }

  changeSort(mode: SortMode): void {
    this.sortMode = mode;
    this.applyFilters();
  }

  applyFilters(): void {
    const base = this.selectedGenre === 'all'
      ? [...this.movies]
      : this.movies.filter((movie) => movie.genres.includes(this.selectedGenre));

    switch (this.sortMode) {
      case 'rating':
        base.sort((a, b) => b.rating - a.rating);
        break;
      case 'alpha':
        base.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));
        break;
      default:
        base.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    }

    this.filteredMovies = base;
  }

  trackById(_: number, movie: Movie): string {
    return movie.id;
  }
}
