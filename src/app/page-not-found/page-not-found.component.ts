import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div>
      <h2>Page Not Found</h2>
      <p>The requested page was not found.</p>
      <!-- You can add additional content or links here -->
    </div>
  `,
  styles: [`
    div {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class PageNotFoundComponent {}
