import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../models/people';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';
import { WikiService } from '../services/wiki';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  title: string = "";
  id: string = "";
  category: string = "";
  isFavorite: boolean = false;
  favorites: any[] = [];


  people: People = new People();
  planet: Planet = new Planet();
  species: Species = new Species();
  starship: Starship = new Starship();

  constructor(
    private route: ActivatedRoute,
    private wikiSrv: WikiService,
    private storageSrv: StorageService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get("cat") ?? "";
    this.id = this.route.snapshot.paramMap.get("id") ?? "";

    // Cargar datos de la wiki
    this.wikiSrv.getArticle(this.category, this.id).subscribe(
      (data: any) => {
        console.log("Datos de API:", data);
        const properties = data.result.properties;
        this.title = properties.name;
        
        const categoryLower = this.category.toLowerCase();
        switch(categoryLower) {
          case "people":
            this.people = properties;
            break;
          case "planets":
            this.planet = properties;
            break;
          case "species":
            this.species = properties;
            break;
          case "starships":
            this.starship = properties;
            break;
        }
        console.log("Category:", categoryLower, "Properties:", properties);
      }
    );

    // Cargar favoritos
    this.storageSrv.get("favorites").then((data) => {
      this.favorites = data ?? [];
      var aux = this.favorites.find(f => {
        return f.id == this.id && f.category == this.category;
      });
      if (aux != null) {
        this.isFavorite = true;
      }
    });
  }

  toggleFavorite() {
    var theName: string = "";
    if (this.isFavorite == true) {
      this.isFavorite = false;
      var aux = this.favorites.findIndex(f => { return f.id == this.id && f.category == this.category; });
      if (aux >= 0) { this.favorites.splice(aux, 1); }
      this.storageSrv.set("favorites", this.favorites);
      this.presentToast("Article removed from favorites successfully");
    } else {
      this.isFavorite = true;
      switch (this.category) {
        case "People":
          theName = this.people.name;
          break;
        case "Planets":
          theName = this.planet.name;
          break;
        case "Species":
          theName = this.species.name;
          break;
        case "Starships":
          theName = this.starship.name;
          break;
      }
      this.favorites.push({ id: this.id, category: this.category, name: theName });
      this.storageSrv.set("favorites", this.favorites);
      this.presentToast("Article added to favorites successfully");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
