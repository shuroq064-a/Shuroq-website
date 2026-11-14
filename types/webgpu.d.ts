/// <reference types="@webgpu/types" />

/**
 * The hero word flare compiles its WGSL shaders at build time with the
 * Turbopack rule from `@vgpu/wgsl/next`, so a `.wgsl` import is a resolved
 * shader source rather than a string.
 */
declare module "*.wgsl" {
  const source: import("@vgpu/wgsl").ShaderSource;
  export default source;
}
