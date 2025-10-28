import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogPageComponent {
  posts = [
    {
      title: 'Cómo elegir tu próxima película',
      excerpt: 'Consejos rápidos para encontrar el género y la historia ideal según tu estado de ánimo.',
      date: '2024-04-02',
      author: 'Equipo JabesFilms'
    },
    {
      title: 'Estrenos destacados del mes',
      excerpt: 'Repasamos los títulos que no te puedes perder y que ya están en nuestra cartelera.',
      date: '2024-03-27',
      author: 'Equipo JabesFilms'
    },
    {
      title: 'Guía: mantener organizada tu lista de favoritas',
      excerpt: 'Aprovecha las etiquetas y filtros para ordenar mejor las películas que amas.',
      date: '2024-03-15',
      author: 'Equipo JabesFilms'
    }
  ];
}
