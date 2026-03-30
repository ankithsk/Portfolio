import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;

  // PERF: Debounce the expensive ScrollTrigger rebuild
  if (resizeTimeout) clearTimeout(resizeTimeout);

  // Immediate: update renderer size (cheap)
  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Deferred: rebuild scroll triggers (expensive, debounced 250ms)
  resizeTimeout = setTimeout(() => {
    const workTrigger = ScrollTrigger.getById("work");
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger != workTrigger) {
        trigger.kill();
      }
    });
    setCharTimeline(character, camera);
    setAllTimeline();
  }, 250);
}
