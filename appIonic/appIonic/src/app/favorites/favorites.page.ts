import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {

  public favorites: any[] = [];

  constructor(private storageSrv: StorageService) { }

  ngOnInit() {
    this.storageSrv.get('favorites').then((data) => {
      this.favorites = data??[];
    });
  }

  generateURL(cat: string, id: string) {
    return "/tabs/wiki/article/" + cat + "/" + id;
  }

}
