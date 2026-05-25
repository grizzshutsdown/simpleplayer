export declare class SimplePlayer extends HTMLElement {
    #private;
    static observedAttributes: string[];
    constructor();
    get src(): string;
    set src(value: string);
    get aspectRatio(): string;
    set aspectRatio(value: string);
    get preloadMargin(): string;
    set preloadMargin(value: string);
    get autoplayEnabled(): boolean;
    set autoplayEnabled(value: boolean);
    get controlsEnabled(): boolean;
    set controlsEnabled(value: boolean);
    get volumeEnabled(): boolean;
    set volumeEnabled(value: boolean);
    get volumeSliderEnabled(): boolean;
    set volumeSliderEnabled(value: boolean);
    get pictureInPictureEnabled(): boolean;
    set pictureInPictureEnabled(value: boolean);
    get fullscreenEnabled(): boolean;
    set fullscreenEnabled(value: boolean);
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'simple-player': SimplePlayer;
    }
}
