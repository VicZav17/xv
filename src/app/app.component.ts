import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatTabsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'dumbinFest';

  images: string[] = [
    'imgs/1.jpeg',
    'imgs/2.jpeg'
  ];

  images2: string[] = [
    'imgs/3.jpeg',
    'imgs/4.jpeg',
    'imgs/5.jpeg',
    'imgs/6.jpeg',
    'imgs/7.jpeg',
    'imgs/8.jpeg',
    'imgs/9.jpeg',
    'imgs/10.jpeg',
    'imgs/11.jpeg',
    'imgs/12.jpeg',
    'imgs/13.jpeg',
    'imgs/14.jpeg',
  ];

  selectedImage: string = '';
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  constructor(private dialog: MatDialog) { }

  openImage(image: string) {
    this.selectedImage = image;
    this.dialog.open(this.dialogContent);
  }

  day: boolean = true;
  eventDate: Date = new Date('2025-04-05T19:00:00'); // Aquí pones la fecha del evento
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  countdownInterval: any;


  ngOnInit(): void {
    if (typeof window !== 'undefined') {  // Verifica si el código se ejecuta en el navegador
      if (isNaN(this.eventDate.getTime())) {
        console.error("Fecha de evento no válida");
        return;
      }

      this.startCountdown();  
      console.log("TRAKAAAAAAAAAAAAA")
    }
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.eventDate.getTime() - now;

      if (distance <= 0) {
        this.day = false;
        clearInterval(this.countdownInterval);
      } else {
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);  // Limpia el intervalo cuando el componente se destruye
    }
  }


}
