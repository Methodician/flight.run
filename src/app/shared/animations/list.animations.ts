import { trigger, state, animate, style, transition } from '@angular/core';

export const listAppears = trigger('listState', [
    state('inactive', style({ opacity: 0, transform: 'translateX(100%)' })),
    state('active', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('inactive => active', [
        style({
            transform: 'translateX(100%) scale(2)',
            opacity: 0.5,
            color: '#ff5274',
            // transform: 'scale(1.3)'
        }),
        animate('1s ease-in', style ({
            transform: 'scale(1)'
        }))
    ]),
    transition('active => inactive', [animate('2s ease-out')])
    // state('inactive', style({opacity: 0})),
    // state('active', style({opacity: 1})),
    // transition('inactive => active', [
    //     style({
    //         color: '#ff5274'
    //     })
    // ])
]);
