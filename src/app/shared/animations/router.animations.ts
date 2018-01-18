import { trigger, state, animate, style, transition } from '@angular/core';


export const routerTransition = trigger('routerTransition', [
    state('void', style({}/*{position:'fixed', width:'100%'}*/)),
    state('*', style({}/*{position:'fixed', width:'100%'}*/)),
    transition(':enter', [  // before 2.1: transition('void => *', [
        style({ transform: 'translateX(-100%)', position: 'fixed', top: 0 }),
        animate('380ms ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
        style({ transform: 'translateX(0%)', position: 'fixed', top: 0 }),
        animate('380ms ease-in-out', style({ transform: 'translateX(100%)' }))
    ])
]);