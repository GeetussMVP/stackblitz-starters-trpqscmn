"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getObjFilePath } from "@/app/components/Produktai/PathToObj/pathToObj";
import styles from "./DesktopProductCard.module.css";

interface Product {
  id: string;
  title: string;
}

interface ThreeDViewerProps {
  product: Product;
  onClose: () => void;
  isInline?: boolean;
}

/* ✅ SAME INITIAL CAMERA AS WORKING EXAMPLE */
const INITIAL_CAMERA = {
  position: new THREE.Vector3(-0.46, 0.13, 1.24),
  rotation: new THREE.Euler(-0.10, -0.36, -0.04),
};

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  product,
  onClose,
  isInline = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    /* ===== Scene ===== */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    /* ===== Camera ===== */
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.copy(INITIAL_CAMERA.position);
    camera.rotation.copy(INITIAL_CAMERA.rotation);

    /* ===== Renderer ===== */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    /* ===== Controls ===== */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI;

    /* ===== Lights ===== */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    /* ===== Load OBJ ===== */
    const objPath = getObjFilePath(product.title);
    if (!objPath) return;

    const loader = new OBJLoader();
    loader.load(objPath, (object) => {
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material =
            new THREE.MeshStandardMaterial({
              color: 0xd6d6d6,
              roughness: 0.6,
              metalness: 0.1,
            });
        }
      });

      /* Center */
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      object.position.sub(center);

      /* Scale */
      const size = box.getSize(new THREE.Vector3()).length();
      const scale = 2 / size;
      object.scale.setScalar(scale);

      scene.add(object);
    });

    /* ===== Animate ===== */
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ===== Resize ===== */
    const handleResize = () => {
      camera.aspect =
        container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    /* ===== Cleanup ===== */
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [product.title]);

  if (!isInline) return null;

  return (
    <div className={styles.imageContainer}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />

      <button
        className={styles.view3DButton}
        onClick={onClose}
      >
        Grįžti į nuotraukas
      </button>
    </div>
  );
};

export default ThreeDViewer;