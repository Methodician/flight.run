import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

export const floatingShip = trigger('floatingShip', [
        state('up', style({transform: 'translateY(50px)'})),
        state('down', style({transform: 'translateY(0)'})),
        transition( 'up <=> down', animate('675ms ease-in'))
]);
