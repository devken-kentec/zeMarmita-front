import { Router, ActivatedRoute } from '@angular/router';
import { ValoresService } from './../shared/valores.service';
import { Valores } from './../shared/valores';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valores-list',
  templateUrl: './valores-list.component.html',
  styleUrls: ['./valores-list.component.css'],
  preserveWhitespaces: true
})
export class ValoresListComponent implements OnInit {

  valores: Valores[] = [];

  constructor(private valoresService: ValoresService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarValores();
  }

  public listarValores(){
    this.valoresService.listarValores().subscribe(
      res => this.valores = res
    );
  }

  public editar(id: number){
    this.router.navigate(["editar", id], {relativeTo: this.route });
  }

}
