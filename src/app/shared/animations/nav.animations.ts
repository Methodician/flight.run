import { trigger, state, animate, style, transition } from '@angular/core';


export const navCollapsed = trigger('navCollapsed', [
    state('true', style({ width: '0px' })),
    state('false', style({ width: '*' })),
    transition('1 => 0', [animate('250ms ease-in')]),
    transition('0 => 1', [animate('380ms ease-out')])
]);

export const navButtonCollapsed = trigger('navButtonCollapsed', [
    state('false', style({ right: '*' })),
    state('true', style({ right: '0' })),
    transition('1 => 0', [animate('250ms ease-in')]),
    transition('0 => 1', [animate('380ms ease-out')])
]);

export const topBarCollapsed = trigger('topBarCollapsed', [
    state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
    state('false', style({ transform: 'rotate(25deg) translateX(7px) translateY(-1px)', width: '20px', height: '3px' })),
    /*
    state('true', style({ transform: 'rotate(-30deg) translateX(-3px)', width: '17px' })),
    state('false', style({ transform: 'rotate(35deg) translateY(200%) translateX(20%)' })),
    */
    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const middleBarCollapsed = trigger('middleBarCollapsed', [
    state('true', style({ width: '*' })),
    state('false', style({ width: '27px', height: '3px' })),
    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const bottomBarCollapsed = trigger('bottomBarCollapsed', [
    state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
    state('false', style({ transform: 'rotate(-25deg) translateX(7px) translateY(1px)', width: '20px', height: '3px' })),
    /*
    state('true', style({ transform: 'rotate(30deg) translateX(-3px)', width: '17px' })),
    state('false', style({ transform: 'rotate(-35deg) translateY(-200%) translateX(20%)' })),
    */
    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const topBarXed = trigger('topBarXed', [
    /*state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
    state('false', style({ transform: 'rotate(25deg) translateX(7px) translateY(-1px)', width: '20px', height: '3px' })),*/

    state('true', style({ transform: '*' })),
    state('false', style({ transform: 'rotate(45deg) translateY(100%) translateX(15%)', width: '27px' })),

    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const middleBarXed = trigger('middleBarXed', [
    state('true', style({ width: '*' })),
    state('false', style({ width: '27px', height: '0px', opacity: '0' })),
    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const bottomBarXed = trigger('bottomBarXed', [
    /*state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
    state('false', style({ transform: 'rotate(-25deg) translateX(7px) translateY(1px)', width: '20px', height: '3px' })),*/

    state('true', style({ transform: '*' })),
    state('false', style({ transform: 'rotate(-45deg) translateY(-100%) translateX(15%)', width: '27px' })),

    /*transition('1 <=> 0', [animate('170ms')])*/
    // for dev:
    transition('1 <=> 0', [animate('250ms')])
]);

export const allNavAnimations = [
    navCollapsed, navButtonCollapsed, topBarCollapsed, middleBarCollapsed,
    bottomBarCollapsed, topBarXed, middleBarXed, bottomBarXed
];


//  Old versions:
//     trigger('navCollapsed', [
//         state('true', style({ width: '0px' })),
//         state('false', style({ width: '*' })),
//         transition('1 => 0', [animate('250ms ease-in')]),
//         transition('0 => 1', [animate('380ms ease-out')])
//     ]),
//     /*trigger('navCentered', [
//         state('true', style({ visibility: '*' })),
//         state('false', style({ visibility: 'visible' })),
//     ]),*/
//     trigger('navButtonCollapsed', [
//         state('false', style({ right: '*' })),
//         state('true', style({ right: '0' })),
//         transition('1 => 0', [animate('250ms ease-in')]),
//         transition('0 => 1', [animate('380ms ease-out')])
//     ]),
//     trigger('topBarCollapsed', [
//         state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
//         state('false', style({ transform: 'rotate(25deg) translateX(7px) translateY(-1px)', width: '20px', height: '3px' })),
//         /*
//         state('true', style({ transform: 'rotate(-30deg) translateX(-3px)', width: '17px' })),
//         state('false', style({ transform: 'rotate(35deg) translateY(200%) translateX(20%)' })),
//         */
//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]),
//     trigger('middleBarCollapsed', [
//         state('true', style({ width: '*' })),
//         state('false', style({ width: '27px', height: '3px' })),
//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]),
//     trigger('bottomBarCollapsed', [
//         state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
//         state('false', style({ transform: 'rotate(-25deg) translateX(7px) translateY(1px)', width: '20px', height: '3px' })),
//         /*
//         state('true', style({ transform: 'rotate(30deg) translateX(-3px)', width: '17px' })),
//         state('false', style({ transform: 'rotate(-35deg) translateY(-200%) translateX(20%)' })),
//         */
//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]),
//     trigger('topBarXed', [
//         /*state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
//         state('false', style({ transform: 'rotate(25deg) translateX(7px) translateY(-1px)', width: '20px', height: '3px' })),*/

//         state('true', style({ transform: '*' })),
//         state('false', style({ transform: 'rotate(45deg) translateY(100%) translateX(15%)', width: '27px' })),

//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]),
//     trigger('middleBarXed', [
//         state('true', style({ width: '*' })),
//         state('false', style({ width: '27px', height: '0px', opacity: '0' })),
//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]),
//     trigger('bottomBarXed', [
//         /*state('true', style({ transform: 'rotate(0) translateX(0)', width: '*' })),
//         state('false', style({ transform: 'rotate(-25deg) translateX(7px) translateY(1px)', width: '20px', height: '3px' })),*/

//         state('true', style({ transform: '*' })),
//         state('false', style({ transform: 'rotate(-45deg) translateY(-100%) translateX(15%)', width: '27px' })),

//         /*transition('1 <=> 0', [animate('170ms')])*/
//         // for dev:
//         transition('1 <=> 0', [animate('250ms')])
//     ]);
// }