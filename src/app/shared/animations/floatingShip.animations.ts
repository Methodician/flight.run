import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

export const floatingShip = trigger('floatingShip', [
    state('up', style({transform: 'translateY(30px)'})),
    state('down', style({transform: 'translateY(0px)'})),
    transition('* <=> *', [
     animate(3000)
    ])
 ]);
