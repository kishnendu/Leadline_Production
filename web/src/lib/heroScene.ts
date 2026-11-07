import * as THREE from 'three'
import { gsap } from './motion'

/**
 * Hero background: a wireframe "blueprint" of a stage that builds itself,
 * then its moving-head lights switch on. Loaded lazily so the headline never waits for it.
 */

const ORANGE = new THREE.Color('#ff6b35')
const BLUE = new THREE.Color('#2f8fff')
const INK = new THREE.Color('#f6f2ea')
const BG = new THREE.Color('#08080b')

type Seg = [number, number, number, number, number, number]

function lines(segs: Seg[], color: THREE.Color, opacity: number) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(segs.flat(), 3))
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, fog: true, depthWrite: false })
  return new THREE.LineSegments(geometry, material)
}

/** A square truss between two points: four rails plus zigzag bracing. */
function truss(a: THREE.Vector3, b: THREE.Vector3, size = 0.45): Seg[] {
  const dir = b.clone().sub(a)
  const len = dir.length()
  dir.normalize()
  const up = Math.abs(dir.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
  const u = new THREE.Vector3().crossVectors(dir, up).normalize().multiplyScalar(size / 2)
  const v = new THREE.Vector3().crossVectors(dir, u).normalize().multiplyScalar(size / 2)
  const corners = [u.clone().add(v), u.clone().sub(v), u.clone().negate().sub(v), u.clone().negate().add(v)]
  const segs: Seg[] = []
  const p = (t: number, c: THREE.Vector3) => a.clone().addScaledVector(dir, t).add(c)
  const steps = Math.max(2, Math.round(len / size))
  corners.forEach((c, i) => {
    const s = p(0, c)
    const e = p(len, c)
    segs.push([s.x, s.y, s.z, e.x, e.y, e.z])
    const next = corners[(i + 1) % 4]
    for (let k = 0; k < steps; k++) {
      const t0 = (k / steps) * len
      const t1 = ((k + 1) / steps) * len
      const from = p(t0, k % 2 ? c : next)
      const to = p(t1, k % 2 ? next : c)
      segs.push([from.x, from.y, from.z, to.x, to.y, to.z])
    }
  })
  return segs
}

function box(cx: number, cy: number, cz: number, w: number, h: number, d: number): Seg[] {
  const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, z0 = cz - d / 2, z1 = cz + d / 2
  return [
    [x0, y0, z0, x1, y0, z0], [x1, y0, z0, x1, y0, z1], [x1, y0, z1, x0, y0, z1], [x0, y0, z1, x0, y0, z0],
    [x0, y1, z0, x1, y1, z0], [x1, y1, z0, x1, y1, z1], [x1, y1, z1, x0, y1, z1], [x0, y1, z1, x0, y1, z0],
    [x0, y0, z0, x0, y1, z0], [x1, y0, z0, x1, y1, z0], [x1, y0, z1, x1, y1, z1], [x0, y0, z1, x0, y1, z1],
  ]
}

const beamVertex = /* glsl */ `
  varying vec3 vNormal; varying vec3 vView; varying float vAlong;
  void main() {
    vAlong = -position.y / 15.0;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`
const beamFragment = /* glsl */ `
  uniform vec3 uColor; uniform float uIntensity;
  varying vec3 vNormal; varying vec3 vView; varying float vAlong;
  void main() {
    float facing = pow(abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    float fade = (1.0 - smoothstep(0.0, 1.0, vAlong)) * smoothstep(0.0, 0.04, vAlong);
    gl_FragColor = vec4(uColor, facing * fade * uIntensity * 0.55);
  }`

const ledFragment = /* glsl */ `
  uniform float uTime; uniform float uOn; varying vec2 vUv;
  void main() {
    vec2 cells = vec2(96.0, 48.0);
    vec2 cell = fract(vUv * cells);
    float pixel = step(0.18, cell.x) * step(0.18, cell.y);
    vec2 q = (floor(vUv * cells) + 0.5) / cells - 0.5;
    q.x *= 2.0;
    float d = length(q);
    float rings = smoothstep(0.55, 1.0, sin(d * 34.0 - uTime * 2.4));
    float sweep = smoothstep(0.92, 1.0, sin(q.x * 6.0 + uTime * 1.3));
    vec3 col = mix(vec3(1.0, 0.42, 0.21), vec3(0.18, 0.56, 1.0), smoothstep(0.1, 0.5, d));
    float glow = (rings * 0.8 + sweep * 0.5) * (1.0 - smoothstep(0.35, 0.75, d) * 0.6);
    gl_FragColor = vec4(col * glow * pixel * uOn, glow * pixel * uOn * 0.9);
  }`

const crowdVertex = /* glsl */ `
  attribute float aPhase; uniform float uTime; uniform float uPixel; uniform float uEnergy;
  varying float vTint;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 2.6 + aPhase * 6.283) * 0.07 * uEnergy + max(0.0, sin(uTime * 1.3 + aPhase * 40.0)) * 0.25 * uEnergy * step(0.82, fract(aPhase * 7.0));
    vTint = fract(aPhase * 13.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPixel * 40.0 / -mv.z;
    gl_Position = projectionMatrix * mv;
  }`
const crowdFragment = /* glsl */ `
  uniform float uOpacity; varying float vTint;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    vec3 col = vTint > 0.85 ? vec3(1.0, 0.42, 0.21) : (vTint > 0.72 ? vec3(0.18, 0.56, 1.0) : vec3(0.96, 0.95, 0.92));
    gl_FragColor = vec4(col, (1.0 - smoothstep(0.25, 0.5, r)) * uOpacity);
  }`

export type HeroScene = { light: () => void; dispose: () => void }

export function createHeroScene(container: HTMLElement, options: { reduced: boolean }): HeroScene | null {
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  const small = window.innerWidth < 760
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75))
  renderer.setClearColor(BG, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(BG, 18, 52)
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200)
  const target = new THREE.Vector3(0, 4.2, -3.5)

  // Floor grid
  const floorMinor: Seg[] = []
  const floorMajor: Seg[] = []
  for (let i = -36; i <= 36; i++) {
    const x = i * 1.2
    ;(i % 5 ? floorMinor : floorMajor).push([x, 0, -30, x, 0, 24])
  }
  for (let i = -25; i <= 20; i++) {
    const z = i * 1.2
    ;(i % 5 ? floorMinor : floorMajor).push([-44, 0, z, 44, 0, z])
  }
  const grid = new THREE.Group()
  grid.add(lines(floorMinor, INK, 0.09), lines(floorMajor, BLUE, 0.32))
  scene.add(grid)

  // Stage deck with a top grid and steps
  const deckSegs = box(0, 0.6, -4.5, 15, 1.2, 7)
  for (let x = -6; x <= 6; x += 1.5) deckSegs.push([x, 1.2, -8, x, 1.2, -1])
  for (let z = -7.5; z <= -1.5; z += 1.5) deckSegs.push([-7.5, 1.2, z, 7.5, 1.2, z])
  deckSegs.push(...box(0, 0.2, -0.4, 4, 0.4, 0.8), ...box(0, 0.6, -0.8, 4, 0.4, 0.4))
  const deck = lines(deckSegs, ORANGE, 0.85)
  scene.add(deck)

  // Truss: two goal posts joined into a roof
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
  const rigSegs: Seg[] = [
    ...truss(v(-8.2, 0, -1.4), v(-8.2, 9.6, -1.4)),
    ...truss(v(8.2, 0, -1.4), v(8.2, 9.6, -1.4)),
    ...truss(v(-8.2, 0, -8), v(-8.2, 9.6, -8)),
    ...truss(v(8.2, 0, -8), v(8.2, 9.6, -8)),
    ...truss(v(-8.2, 9.6, -1.4), v(8.2, 9.6, -1.4)),
    ...truss(v(-8.2, 9.6, -8), v(8.2, 9.6, -8)),
    ...truss(v(-8.2, 9.6, -1.4), v(-8.2, 9.6, -8)),
    ...truss(v(8.2, 9.6, -1.4), v(8.2, 9.6, -8)),
  ]
  const rig = lines(rigSegs, INK, 0.55)
  scene.add(rig)

  // Speaker stacks
  const stacks = lines(
    [...box(-10.2, 1.4, -2.5, 1.6, 2.8, 1.6), ...box(-10.2, 3.6, -2.5, 1.6, 1.6, 1.6), ...box(10.2, 1.4, -2.5, 1.6, 2.8, 1.6), ...box(10.2, 3.6, -2.5, 1.6, 1.6, 1.6)],
    BLUE,
    0.6,
  )
  scene.add(stacks)

  // LED wall
  const ledUniforms = { uTime: { value: 0 }, uOn: { value: 0 } }
  const led = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 6.5),
    new THREE.ShaderMaterial({
      uniforms: ledUniforms,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: ledFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  )
  led.position.set(0, 5.1, -7.9)
  scene.add(led)
  const ledFrame = lines(box(0, 5.1, -7.9, 13, 6.5, 0.01), INK, 0.4)
  scene.add(ledFrame)

  // Moving-head lights with soft volumetric beams
  const heads: { pivot: THREE.Group; phase: number; uniforms: { uColor: { value: THREE.Color }; uIntensity: { value: number } } }[] = []
  const beamGeometry = new THREE.ConeGeometry(2.3, 15, 40, 1, true)
  beamGeometry.translate(0, -7.5, 0)
  const headCount = small ? 5 : 7
  for (let i = 0; i < headCount; i++) {
    const span = small ? 8.4 : 13.2
    const x = -span / 2 + (span * i) / (headCount - 1)
    const pivot = new THREE.Group()
    pivot.position.set(x, 9.1, -1.4)
    const uniforms = { uColor: { value: i % 2 ? BLUE : ORANGE }, uIntensity: { value: 0 } }
    const beam = new THREE.Mesh(
      beamGeometry,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: beamVertex,
        fragmentShader: beamFragment,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    )
    pivot.add(beam, lines(box(0, 0, 0, 0.5, 0.5, 0.5), i % 2 ? BLUE : ORANGE, 0.95))
    scene.add(pivot)
    heads.push({ pivot, phase: i * 0.9, uniforms })
  }

  // Crowd as glowing points
  const crowdCount = small ? 520 : 1100
  const positions = new Float32Array(crowdCount * 3)
  const phases = new Float32Array(crowdCount)
  for (let i = 0; i < crowdCount; i++) {
    const z = 1.5 + Math.pow(Math.random(), 0.8) * 15
    const spread = 7 + z * 0.75
    positions.set([(Math.random() * 2 - 1) * spread, 1.55 + Math.random() * 0.2, z], i * 3)
    phases[i] = Math.random()
  }
  const crowdGeometry = new THREE.BufferGeometry()
  crowdGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  crowdGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  const crowdUniforms = { uTime: { value: 0 }, uPixel: { value: renderer.getPixelRatio() }, uOpacity: { value: 0 }, uEnergy: { value: 0.3 } }
  const crowd = new THREE.Points(
    crowdGeometry,
    new THREE.ShaderMaterial({ uniforms: crowdUniforms, vertexShader: crowdVertex, fragmentShader: crowdFragment, transparent: true, depthWrite: false }),
  )
  scene.add(crowd)

  // Build-in: the blueprint draws itself
  const fadeables = [grid, deck, rig, stacks, ledFrame, ...heads.map((h) => h.pivot.children[1] as THREE.LineSegments)]
  const targets = new Map<THREE.Material, number>()
  fadeables.forEach((obj) => obj.traverse((child) => {
    const mat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial | undefined
    if (mat && 'opacity' in mat) {
      targets.set(mat, mat.opacity)
      mat.opacity = 0
    }
  }))
  const build = gsap.timeline({ paused: options.reduced })
  const fadeIn = (obj: THREE.Object3D, at: number) =>
    obj.traverse((child) => {
      const mat = (child as THREE.LineSegments).material as THREE.LineBasicMaterial | undefined
      if (mat && targets.has(mat)) build.to(mat, { opacity: targets.get(mat)!, duration: 1.1, ease: 'power2.out' }, at)
    })
  fadeIn(grid, 0)
  build.from(grid.scale, { x: 0.4, z: 0.4, duration: 1.8, ease: 'power3.out' }, 0)
  fadeIn(deck, 0.35)
  build.from(deck.scale, { y: 0.01, duration: 0.9, ease: 'power3.out' }, 0.35)
  fadeIn(rig, 0.6)
  build.from(rig.scale, { y: 0.01, duration: 1.3, ease: 'power3.out' }, 0.6)
  fadeIn(stacks, 0.9)
  fadeIn(ledFrame, 1)
  heads.forEach((h, i) => fadeIn(h.pivot, 1.1 + i * 0.05))
  build.to(crowdUniforms.uOpacity, { value: 0.75, duration: 1.4 }, 0.8)

  let lit = false
  const light = () => {
    if (lit) return
    lit = true
    const on = gsap.timeline()
    heads.forEach((h, i) => {
      // A quick flicker per fixture, like lamps striking
      on.to(h.uniforms.uIntensity, { value: 1, duration: 0.05 }, i * 0.07)
        .to(h.uniforms.uIntensity, { value: 0.2, duration: 0.05 }, i * 0.07 + 0.08)
        .to(h.uniforms.uIntensity, { value: 1, duration: 0.3 }, i * 0.07 + 0.16)
    })
    on.to(ledUniforms.uOn, { value: 1, duration: 0.8 }, 0.3).to(crowdUniforms.uEnergy, { value: 1, duration: 1.2 }, 0.3)
  }
  if (options.reduced) {
    build.progress(1)
    heads.forEach((h) => (h.uniforms.uIntensity.value = 1))
    ledUniforms.uOn.value = 1
    crowdUniforms.uEnergy.value = 0
    lit = true
  } else {
    build.play()
  }

  // Sizing: on wide screens shift the stage right so the headline has room
  let width = 1
  let height = 1
  // Wide screens: stage to the right of the headline. Portrait phones: a low, close
  // camera so the rig fills the screen behind the headline and the crowd fills the bottom.
  const layouts = {
    wide: { fov: 40, z: 21, y: 4.6, orbit: 3.2, sway: 0.5, push: 8, target: new THREE.Vector3(0, 4.2, -3.5) },
    tall: { fov: 62, z: 16.5, y: 5.4, orbit: 1.1, sway: 0.25, push: 4, target: new THREE.Vector3(0, 4.8, -4) },
  }
  let layout = layouts.wide
  const resize = () => {
    width = container.clientWidth || 1
    height = container.clientHeight || 1
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    const wide = camera.aspect > 1.15
    layout = wide ? layouts.wide : layouts.tall
    camera.fov = layout.fov
    target.copy(layout.target)
    if (wide) camera.setViewOffset(width, height, -width * 0.2, height * 0.04, width, height)
    else camera.setViewOffset(width, height, 0, height * 0.12, width, height)
    camera.updateProjectionMatrix()
    if (options.reduced) render(0)
  }

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const onPointer = (event: PointerEvent) => {
    pointer.tx = event.clientX / window.innerWidth - 0.5
    pointer.ty = event.clientY / window.innerHeight - 0.5
  }

  const render = (t: number) => {
    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    const scroll = Math.min(1, window.scrollY / Math.max(1, height))
    camera.position.set(
      Math.sin(t * 0.11) * layout.orbit + pointer.x * 4,
      layout.y + Math.sin(t * 0.17) * layout.sway - pointer.y * 2 + scroll * 1.5,
      layout.z - scroll * layout.push,
    )
    camera.lookAt(target)
    heads.forEach((h, i) => {
      h.pivot.rotation.z = Math.sin(t * 0.55 + h.phase) * 0.55 + (i - (heads.length - 1) / 2) * -0.04
      h.pivot.rotation.x = 0.35 + Math.sin(t * 0.43 + h.phase * 1.7) * 0.32
    })
    ledUniforms.uTime.value = t
    crowdUniforms.uTime.value = t
    renderer.render(scene, camera)
  }

  let frame = 0
  let visible = true
  const clock = new THREE.Clock()
  const loop = () => {
    frame = requestAnimationFrame(loop)
    if (!visible || document.hidden) return
    render(clock.getElapsedTime())
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  const intersection = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  intersection.observe(container)
  resize()
  if (!options.reduced) {
    window.addEventListener('pointermove', onPointer, { passive: true })
    loop()
  } else {
    render(2)
  }

  return {
    light,
    dispose: () => {
      cancelAnimationFrame(frame)
      build.kill()
      gsap.killTweensOf([...heads.map((h) => h.uniforms.uIntensity), ledUniforms, crowdUniforms.uEnergy, crowdUniforms.uOpacity])
      window.removeEventListener('pointermove', onPointer)
      resizeObserver.disconnect()
      intersection.disconnect()
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        mesh.geometry?.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
