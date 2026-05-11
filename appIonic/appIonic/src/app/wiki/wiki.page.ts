import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-wiki",
  templateUrl: "./wiki.page.html",
  styleUrls: ["./wiki.page.scss"],
  standalone: false,
})
export class WikiPage implements OnInit {
  readonly categories: string[] = ["People", "Planets", "Species", "Starships"];

  constructor() {}

  ngOnInit() {}
}
