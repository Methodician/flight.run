import {isPlatformBrowser} from "@angular/common";
import {ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID} from '@angular/core';

export const WINDOW = new InjectionToken('WindowToken');

export abstract class WindowRef {

    getNativeWindow(): Window | Object {
        throw new Error('Not implemented.');
    }
}

export class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }

    get nativeWindow(): Window | Object {
        return window;
    }
}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
    if (isPlatformBrowser(platformId)){
        return browserWindowRef.nativeWindow;
    }
    return new Object();
}

export const browserWindowProvider: ClassProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
}

export const windowProvider: FactoryProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, PLATFORM_ID]
};

export const WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
]

