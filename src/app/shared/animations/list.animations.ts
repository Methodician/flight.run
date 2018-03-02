import { trigger, state, animate, style, transition } from '@angular/core';


export const listAppears = trigger('listState', [
    state('inactive', style({ transform: 'translateX(-100%)' })),
    state('active', style({ transform: 'translateX(0)' })),
    transition('inactive => active', [animate('400ms ease-out')]),
    transition('active => inactive', [animate('2s ease-out')])
]);
