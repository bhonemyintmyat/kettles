declare module "curtainsjs" {
  export class Curtains {
    constructor(params: any);
    setSize(): void;
    dispose(): void;
  }

  export class Plane {
    constructor(curtains: any, element: HTMLElement, params: any);
    uniforms: any;
    onRender(cb: () => void): this;
    onError(cb: () => void): this;
    remove(): void;
  }
}

