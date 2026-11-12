/// <reference types="jquery" />

/**
 * Type declarations for the third-party jQuery plugins that are loaded as
 * classic <script> tags from /public/js (bootstrap, fancybox, mixitup,
 * scrolly, ripples, validator, wow). They are not bundled, only typed.
 */

interface FancyboxOptions {
  openEffect?: string;
  closeEffect?: string;
  prevEffect?: string;
  prevSpeed?: number;
  nextEffect?: string;
  nextSpeed?: number;
  closeBtn?: boolean;
  helpers?: Record<string, unknown>;
}

interface MixItUpOptions {
  selectors?: { target?: string; filter?: string };
  load?: { filter?: string };
}

interface RipplesOptions {
  resolution?: number;
  dropRadius?: number;
  perturbance?: number;
  interactive?: boolean;
}

interface JQuery<TElement = HTMLElement> {
  // Bootstrap 3
  collapse(action: 'show' | 'hide' | 'toggle'): this;
  scrollspy(options: { target: string; offset?: number }): this;
  // Plugins
  fancybox(options?: FancyboxOptions): this;
  mixItUp(options?: MixItUpOptions): this;
  scrolly(options?: { bgParallax?: boolean }): this;
  ripples(options?: RipplesOptions): this;
  validator(): this;
  // jQuery 2.x still supports .load(handler) for the window load event
  load(handler: (this: TElement, event: JQuery.Event) => void): this;
}

interface WOWOptions {
  boxClass?: string;
  animateClass?: string;
  offset?: number;
  mobile?: boolean;
  live?: boolean;
}

declare class WOW {
  constructor(options?: WOWOptions);
  init(): void;
}
