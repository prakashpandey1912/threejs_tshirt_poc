import { ModelSide } from "@/app/page";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

interface ThreeSceneProps {
  modelSide: ModelSide[]
}
const ThreeScene: React.FC<ThreeSceneProps> = ({modelSide}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // const texture = [
  //   { texture: "/texture/texture.jpg", price: "240" },
  //   { texture: "/texture/texture1.jpg", price: "750" },
  //   { texture: "/texture/texture2.jpg", price: "650" },
  // ];

  // const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  // const [selectedTexture, setSelectedTexture] = useState<string | null>(null);

  // const [totalAmount, setTotalAmount] = useState<string>("0");

  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let requestId: number;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf2f0fa);
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerHeight / window.innerHeight,
        0.01,
        1000
      );
    
      camera.position.z = 1.3;
      rendererRef.current = new THREE.WebGLRenderer({antialias: true});
      rendererRef.current.setSize(window.innerHeight, window.innerHeight);
      containerRef.current?.appendChild(rendererRef.current.domElement);

      const loader = new GLTFLoader();
      loader.load("/model/Jersey_01.glb", (gltf) => {
        const model = gltf.scene;
        // Add the model to the scene
        scene.add(model);
        setModel(model);
      });

      // OrbitControls with animation
      const controls = new OrbitControls(
        camera,
        rendererRef.current.domElement
      );
      controls.target = new THREE.Vector3(0, 0, 0); // Optional target for orbit
      controls.minDistance = 0.5;
      controls.maxDistance = 1.3;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minPolarAngle = Math.PI / 2.6;
      

      // Animate controls using requestAnimationFrame
      const animate = () => {
        controls.update();
        rendererRef.current?.render(scene, camera);
        requestId = requestAnimationFrame(animate);
      };

      animate();

      const handleWindowResize = () => {
        const width = window.innerHeight;
        const height = window.innerHeight;
        rendererRef.current?.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleWindowResize);

      // light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Add point light to create a glowing effect
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(0, 0, 1.4); // Adjust position as needed
      scene.add(pointLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      scene.add(directionalLight);

      // Cleanup on unmount
      return () => {
        rendererRef.current?.dispose();
        cancelAnimationFrame(requestId);
      };
    }
  }, []);

  useEffect(() => {
    if (!model) return;
    modelSide.map(side => {
      if (side.value) {
          // Get the mesh by name
          const mesh = model.getObjectByName(side.meshName) as THREE.Mesh;
          if (mesh) {
              const material = new THREE.MeshStandardMaterial({ color: side.value }); 
              mesh.material = material;
          }
      }
    });
  }, [model,modelSide]);

  return (
    <div className="flex justify-center">
      <div  className="absolute" ref={containerRef}></div>
    </div>
  );
};

export default ThreeScene;
