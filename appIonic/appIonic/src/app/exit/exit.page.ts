import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.page.html',
  styleUrls: ['./exit.page.scss'],
  standalone: false,
})
export class ExitPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async onYes() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'You have decided to close the app. Since this is a web environment, the app cannot be closed automatically.',
      buttons: ['OK']
    });

    await alert.present();
  }

  onNo() {
    this.navCtrl.navigateBack('/tabs/wiki');
  }

}
