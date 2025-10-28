import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  featuredMovies: Movie[] = [];
  trendingMovies: Movie[] = [];
  favoriteMovies: Movie[] = [];
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];

  genres: FilterOption[] = [];
  years: FilterOption[] = [];

  searchTerm = '';
  selectedGenre = 'all';
  selectedYear = 'all';

  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit(): void {
    this.allMovies = this.moviesService.getAll();
    this.featuredMovies = this.moviesService.getFeatured();
    this.trendingMovies = [...this.featuredMovies].sort((a, b) => (a.trendingRank ?? 999) - (b.trendingRank ?? 999));
    this.loadFavorites();
    this.genres = [
      { label: 'Todos los géneros', value: 'all' },
      ...this.moviesService.getGenres().map((genre) => ({ label: genre, value: genre }))
    ];
    this.years = [
      { label: 'Cualquier año', value: 'all' },
      ...this.moviesService.getYears().map((year) => ({ label: year, value: year }))
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    const favorites = this.moviesService.getFavorites();
    this.filteredMovies = this.allMovies
      .filter((movie) => {
        const matchesSearch = this.searchTerm
          ? (
            `${movie.title} ${movie.originalTitle} ${movie.synopsis} ${movie.genres.join(' ')}`
          ).toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;
        const matchesGenre = this.selectedGenre === 'all' || movie.genres.includes(this.selectedGenre);
        const matchesYear = this.selectedYear === 'all'
          || new Date(movie.releaseDate).getFullYear().toString() === this.selectedYear;
        return matchesSearch && matchesGenre && matchesYear;
      })
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

    this.favoriteMovies = this.allMovies.filter((movie) => favorites.has(movie.id));
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedGenre = 'all';
    this.selectedYear = 'all';
    this.applyFilters();
  }

  scrollToExplore(): void {
    const element = document.getElementById('explorar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFavorite(movie: Movie): void {
    this.moviesService.toggleFavorite(movie.id);
    this.applyFilters();
  }

  isFavorite(movie: Movie): boolean {
    return this.moviesService.isFavorite(movie.id);
  }

  loadFavorites(): void {
    const favorites = this.moviesService.getFavorites();
    this.favoriteMovies = this.allMovies.filter((movie) => favorites.has(movie.id));
  }

  trackById(_: number, movie: Movie): string {
    return movie.id;
  }
}
