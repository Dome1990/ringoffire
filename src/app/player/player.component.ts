import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() {}

  @Input() name: any;
  @Input() PlayerActive: boolean = false;
  @Input() profilePic: any;

  ngOnInit(): void {
  }

}
