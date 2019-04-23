import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  // Harà referencia al ion-list
  @ViewChild( IonList ) lista: IonList;

  // Se va a usar para mandar el valor al pipe
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista){
    if(this.terminada){
      this.router.navigateByUrl('/tabs/tab2/agregar/' + lista.id);
    } else {
      this.router.navigateByUrl('/tabs/tab1/agregar/' + lista.id);
    }
  }

  borrarLista( lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista( lista: Lista){
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { 
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            if( data.titulo.length === 0){
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
