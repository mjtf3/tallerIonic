import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.page.html',
  styleUrls: ['./exit.page.scss'],
  standalone: false,
})
export class ExitPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async confirmExit(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar salida',
      message: '¿Seguro que quieres salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'destructive',
          handler: () => {
            if (Capacitor.isNativePlatform()) {
              App.exitApp();
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
