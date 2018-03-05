import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

export const listAppears = trigger('listState', [
    // state('inactive', style({ opacity: 0, transform: 'translateX(100%)' })),
    // state('active', style({ opacity: 1, transform: 'translateX(0)' })),
    // transition('inactive => active', [
    //     style({
    //         transform: 'translateX(100%) scale(2)',
    //         opacity: 0.5,
    //         color: '#ff5274',
    //         // transform: 'scale(1.3)'
    //     }),
    //     animate('1s ease-in', style ({
    //         transform: 'scale(1)'
    //     }))
    // ]),
    // transition('active => inactive', [animate('2s ease-out')])
    state('inactive', style({opacity: 0})),
    state('active', style({opacity: 1})),
    transition('inactive => active', [
        animate('600ms ease-out', keyframes([
            style({opacity:0,
                //  transform: 'translateX(0)',
                  offset: 0}),
            style({opacity: 0.5, color: '#ff5274', offset: 0.7}),
            // style({transform: 'translateX(0)', offset: 0.5}),
            style({opacity: 1, transform: 'translateX(0) scale(1)', offset: 1})
        ]))      
    ])
]);
