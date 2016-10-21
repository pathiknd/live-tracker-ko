This is a demo SPA using KnockoutJS. It is doing exactly the same thing as the one built using Angular 2 and Typescript - https://github.com/pathiknd/live-tracker

The application is using KnockoutJS 3.4.0

App is available via Github Pages at https://pathiknd.github.io/live-tracker-ko/

## Angular 2 vs KnockoutJS

 * KnockoutJS is easier to learn and start developing. Angular 2 has bigger learning curve because it is a full framework with lot of features.
 
 * Angular 2 provide better code readbility and maintainability by enforcing modular approach to development - by forcing to create components by default. Knockout doesn't force modular development and let you write code that can be difficult to maintain.
 
 * Angular 2 has much cleaner support for collaboration between different components using events. In KO, you have to use callbacks in Javascript to let events bubble up to parent components. Again, this requires developers to follow a consistent approach throughout to ensure better maintainability.
 
 * With KO, you may have to deal with jQuery and native events in certain cases which increases the complexity unnecessarily. 
 
 * KO requires accessing observable members in very particular way - using () but without () for arrays in certain cases. This can be tricky for new developers. 
 
 * Angular 2 has better tooling in the form of angular-cli.
 
 * If you breakdown application in to components and organize them in to different files for more maintainability, you'll have to use a module loader like RequireJS or bundle the application using something like webpack. I have used RequireJS in this demo. Managing dependencies in RequireJS modules can be cumbersome once the application grows beyond a point. And bundling would require configuring Webpack or similar tool - not trivial for newbies. Here again, Angular 2 wins by having a superior tooling: angular-cli. angular-cli wraps the complexity of setting up webpack and allows bundling the application using simple commands. 
