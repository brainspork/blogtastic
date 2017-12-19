import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  title: String;
  description: String;
  body: String;
  tags: String[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  publishArticle() {
    let article = {
      title: this.title,
      description: this.description,
      articleBody: this.body,
      pubDate: new Date().toLocaleDateString(),
      pubTime: Date.now(),
      views: 0,
      upVotes: 0,
      downVotes: 0,
      tags: this.tags.split(',');
    }

    
  }

}
