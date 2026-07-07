// Faulty Terminal WebGL background — ported from React Bits (MIT), raw WebGL1.
// window.initFaultyTerminal(container, opts) -> returns cleanup fn
(function () {
  const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;

uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;

  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;

  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;

  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);

  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);

  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;

    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;

        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }

    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);

        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }

    p = fract(p);
    p *= uDigitSize;

    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);

    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;

    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){

    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;

    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);

    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));

    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }

    vec2 p = uv * uScale;
    // Aspect correction: keep digit cells a constant shape on any viewport.
    // Normalised to 16:9 so wide/desktop layouts are unchanged; portrait/mobile
    // stops stretching the cells vertically, with a little extra widening.
    float aspect = iResolution.x / iResolution.y;
    float f = aspect / 1.7777;
    f *= mix(0.55, 1.0, clamp(aspect, 0.0, 1.0));
    p.x *= f;
    vec3 col = getColor(p);

    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }

    col *= uTint;
    col *= uBrightness;

    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

  function hexToRgb(hex) {
    let h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const num = parseInt(h, 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Faulty Terminal shader error:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  window.initFaultyTerminal = function initFaultyTerminal(container, opts) {
    opts = opts || {};
    const o = {
      scale: opts.scale ?? 1,
      gridMul: opts.gridMul ?? [2, 1],
      digitSize: opts.digitSize ?? 1.5,
      timeScale: opts.timeScale ?? 0.3,
      scanlineIntensity: opts.scanlineIntensity ?? 0.3,
      glitchAmount: opts.glitchAmount ?? 1,
      flickerAmount: opts.flickerAmount ?? 1,
      noiseAmp: opts.noiseAmp ?? 0,
      chromaticAberration: opts.chromaticAberration ?? 0,
      dither: opts.dither ?? 0,
      curvature: opts.curvature ?? 0.2,
      tint: opts.tint ?? '#ffffff',
      mouseReact: opts.mouseReact ?? true,
      mouseStrength: opts.mouseStrength ?? 0.2,
      pageLoadAnimation: opts.pageLoadAnimation ?? true,
      brightness: opts.brightness ?? 1,
      dpr: opts.dpr ?? Math.min(window.devicePixelRatio || 1, 2),
    };

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) { console.warn('WebGL not available for Faulty Terminal'); return function () {}; }
    container.appendChild(canvas);

    const vs = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Faulty Terminal link error:', gl.getProgramInfoLog(prog));
      return function () {};
    }
    gl.useProgram(prog);

    // Fullscreen triangle
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(prog, n);
    const uni = {
      iTime: U('iTime'), iResolution: U('iResolution'), uScale: U('uScale'),
      uGridMul: U('uGridMul'), uDigitSize: U('uDigitSize'), uScanlineIntensity: U('uScanlineIntensity'),
      uGlitchAmount: U('uGlitchAmount'), uFlickerAmount: U('uFlickerAmount'), uNoiseAmp: U('uNoiseAmp'),
      uChromaticAberration: U('uChromaticAberration'), uDither: U('uDither'), uCurvature: U('uCurvature'),
      uTint: U('uTint'), uMouse: U('uMouse'), uMouseStrength: U('uMouseStrength'), uUseMouse: U('uUseMouse'),
      uPageLoadProgress: U('uPageLoadProgress'), uUsePageLoadAnimation: U('uUsePageLoadAnimation'),
      uBrightness: U('uBrightness'),
    };

    const tint = hexToRgb(o.tint);
    gl.uniform1f(uni.uScale, o.scale);
    gl.uniform2f(uni.uGridMul, o.gridMul[0], o.gridMul[1]);
    gl.uniform1f(uni.uDigitSize, o.digitSize);
    gl.uniform1f(uni.uScanlineIntensity, o.scanlineIntensity);
    gl.uniform1f(uni.uGlitchAmount, o.glitchAmount);
    gl.uniform1f(uni.uFlickerAmount, o.flickerAmount);
    gl.uniform1f(uni.uNoiseAmp, o.noiseAmp);
    gl.uniform1f(uni.uChromaticAberration, o.chromaticAberration);
    gl.uniform1f(uni.uDither, typeof o.dither === 'boolean' ? (o.dither ? 1 : 0) : o.dither);
    gl.uniform1f(uni.uCurvature, o.curvature);
    gl.uniform3f(uni.uTint, tint[0], tint[1], tint[2]);
    gl.uniform1f(uni.uMouseStrength, o.mouseStrength);
    gl.uniform1f(uni.uUseMouse, o.mouseReact ? 1 : 0);
    gl.uniform1f(uni.uUsePageLoadAnimation, o.pageLoadAnimation ? 1 : 0);
    gl.uniform1f(uni.uPageLoadProgress, o.pageLoadAnimation ? 0 : 1);
    gl.uniform1f(uni.uBrightness, o.brightness);

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };

    function resize() {
      const w = Math.max(1, container.offsetWidth);
      const h = Math.max(1, container.offsetHeight);
      const cw = Math.floor(w * o.dpr);
      const ch = Math.floor(h * o.dpr);
      if (cw === canvas.width && ch === canvas.height) return; // no actual change → avoid RO loop
      canvas.width = cw;
      canvas.height = ch;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(uni.iResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    }
    let resizePending = false;
    const ro = new ResizeObserver(() => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => { resizePending = false; resize(); });
    });
    ro.observe(container);
    resize();

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    }
    if (o.mouseReact) container.addEventListener('mousemove', onMove);

    const timeOffset = Math.random() * 100;
    let raf = 0;
    let loadStart = 0;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (o.pageLoadAnimation && loadStart === 0) loadStart = t;

      const elapsed = (t * 0.001 + timeOffset) * o.timeScale;
      gl.uniform1f(uni.iTime, reduced ? timeOffset * o.timeScale : elapsed);

      if (o.pageLoadAnimation && loadStart > 0) {
        const progress = Math.min((t - loadStart) / 2000, 1);
        gl.uniform1f(uni.uPageLoadProgress, progress);
      }

      if (o.mouseReact) {
        smooth.x += (mouse.x - smooth.x) * 0.08;
        smooth.y += (mouse.y - smooth.y) * 0.08;
        gl.uniform2f(uni.uMouse, smooth.x, smooth.y);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    raf = requestAnimationFrame(frame);

    return function cleanup() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (o.mouseReact) container.removeEventListener('mousemove', onMove);
      if (canvas.parentElement === container) container.removeChild(canvas);
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    };
  };
})();
