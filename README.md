This is a demo SPA using KnockoutJS. It is doing exactly the same thing as the one built using Angular 2 and Typescript - https://github.com/pathiknd/live-tracker

The application is using KnockoutJS 3.4.0

## Angular 2 vs KnockoutJS

 * KnockoutJS is much easier to learn and start developing. Angular 2 has bigger learning curve because it is a full framework with lot of features.
 
 * Angular 2 provide better code readbility and maintainability by enforcing modular approach to development - by forcing to create components by default. Knockout doesn't force modular development and let you write code that can be difficult to maintain.
 
 * Angular 2 has much cleaner support for collaboration between different components using events. In KO, you have to use callbacks in Javascript to let events bubble up to parent components. Again, this requires developers to follow a consistent approach throughout to ensure better maintainability.
 
 * With KO, you may have to deal with jQuery and native events in certain cases which increases the complexity unnecessarily. 
 
 * KO requires accessing observable members in very particular way - using () in some cases but without () for arrays in certain cases. This can be tricky for new developers. Angular 2 is much better in this case.
 
 
