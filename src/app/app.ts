/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and services
 */
import {Directive, Component, View, ElementRef} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(element: ElementRef) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    element.nativeElement.style.fontSize = 'x-large';
  }
}


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <header>
    <h1 class="title">Hello {{ title }}</h1>
  </header>

  <main>
<textarea name="abc" id="abc" cols="80" rows="15">{{ notes  }}
</textarea>
 <a class="ac-button md-default-theme"
             [router-link]=" ['./timeflies'] "
             (click)="active = 1"
             [class.active]="active === 1">Timeflies</a>
<hr />
<div ng-click="App.addNote()" >Test</div>
<div id="midi"></div>
<div id="warnings"></div>
<div id="music"></div>
<div id="paper0"></div>
<div id="paper1"></div>
<div id="paper2"></div>
<div id="paper3"></div>


    <div>

      <input type="text" [value]="title" (input)="title = $event.target.value" autofocus>
      <!--
        Rather than wiring up two-way data-binding ourselves
        we can use Angular's [(ng-model)] syntax
        <input type="text" [(ng-model)]="title">
      -->
    </div>

    <pre>this.title = {{ title | json }}</pre>
    <pre>this.data = {{ data | json }}</pre>


  </main>

  <footer x-large>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  // These are member type
  title: string;
  notes: string;
  data: Array<any> = []; // default data
  // TypeScript public modifiers
  constructor(public http: Http) {
    this.title = 'Angular 2';
    this.notes = "X: 1 \nT: Cooley\'s\n" +
  "M: 4 / 4 \nL: 1 / 8\nR: reel\nK: Emin\n" +
  '|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|' + "\n" +
  'EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|' + "\n" +
  '|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|' + "\n" +
  'eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|';

  }
  
  addNote(){
    this.notes += "A";
  }

  onInit() {
    // Our API
    // npm run express-install
    // npm run express

    const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';
    const JSON_HEADERS = new Headers();

    JSON_HEADERS.append('Accept', 'application/json');
    JSON_HEADERS.append('Content-Type', 'application/json');

    this.http
      .get(BASE_URL + TODO_API_URL, {
        headers: JSON_HEADERS
      })
      .map(res => res.json())
      .subscribe(
        // onNext callback
        data => this.serverData(data),
        // onError callback
        err  => this.errorMessage(err),
        // onComplete callback
        ()   => console.log('complete')
      );//end http

  }

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }//serverData

  errorMessage(err) {
    console.info(`${'\n'
      } // You must run these commands for the Http API to work in another process ${'\n'
      } npm run express-install ${'\n'
      } npm run express
    `);
    console.error(err);
  }//errorMessage

}



/*
 * Please review the examples/ folder for more angular app examples
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * you can change the `entry` in webpack.config to quickly view the examples
 * For help or questions please contact us at @AngularClass on twitter
 * or via chat on gitter at https://gitter.im/angular-class/angular2-webpack-starter
 */
