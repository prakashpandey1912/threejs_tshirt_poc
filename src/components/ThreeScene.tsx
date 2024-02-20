"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const swatches = [
    { color: "red", tailwind: "bg-red-500", price: "350" },
    { color: "blue", tailwind: "bg-blue-500", price: "250" },
    { color: "green", tailwind: "bg-green-500", price: "300" },
    { color: "yellow", tailwind: "bg-yellow-500", price: "450" },
    { color: "orange", tailwind: "bg-orange-500", price: "650" },
    { color: "lime", tailwind: "bg-lime-500", price: "550" },
    { color: "teal", tailwind: "bg-teal-500", price: "300" },
    { color: "cyan", tailwind: "bg-cyan-500", price: "320" },
    { color: "purple", tailwind: "bg-purple-500", price: "310" },
    { color: "gray", tailwind: "bg-gray-500", price: "290" },
  ];

  const texture = [
    { texture: "/texture/texture.jpg", price: "240" },
    { texture: "/texture/texture1.jpg", price: "750" },
    { texture: "/texture/texture2.jpg", price: "650" },
  ];

  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);

  const [totalAmount, setTotalAmount] = useState<string>("0");

  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    console.log("useeffect");
    if (typeof window !== "undefined") {
      let requestId: number;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.z = 2.5;
      rendererRef.current = new THREE.WebGLRenderer();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(rendererRef.current.domElement);

      const loader = new GLTFLoader();
      loader.load("/model/t-shirt.glb", (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1.2, 0);
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

      // Animate controls using requestAnimationFrame
      const animate = () => {
        controls.update();
        rendererRef.current?.render(scene, camera);
        requestId = requestAnimationFrame(animate);
      };

      animate();

      const handleWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        rendererRef.current?.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleWindowResize);

      // light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      // Add point light to create a glowing effect
      const pointLight = new THREE.PointLight(new THREE.Color("red"), 1, 100);
      pointLight.position.set(0, 0, 0); // Adjust position as needed
      scene.add(pointLight);
      const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
      pointLight1.position.set(0, 0, 0); // Adjust position as needed
      scene.add(pointLight1);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 8, 7.5);
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

    const applyMaterialToModel = (
      materialOptions: THREE.MeshBasicMaterialParameters
    ) => {
      const material = new THREE.MeshBasicMaterial(materialOptions);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
    };

    const materialOptions: THREE.MeshBasicMaterialParameters = {
      color: selectedSwatch || new THREE.Color(0, 0, 0),
    };

    if (selectedTexture) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(selectedTexture, (texture) => {
        materialOptions.map = texture;
        applyMaterialToModel(materialOptions);
      });
    } else {
      applyMaterialToModel(materialOptions);
    }
  }, [model, selectedSwatch, selectedTexture]);

  return (
    <>
      <header className="flex justify-between py-4 text-lg text-center">
        <div>
          <h1 className="font-bold">Your T-Shirt Color</h1>
          <div className="flex justify-center mt-4">
            {swatches.map((swatch) => (
              <button
                key={swatch.color}
                className={`m-1 rounded-full w-8 h-8 bg-${swatch.color}-500`}
                style={{
                  opacity: selectedSwatch === swatch.color ? 1 : 0.5,
                  border:
                    selectedSwatch === swatch.color
                      ? "2px solid black"
                      : "none",
                }}
                onClick={() => {
                  setSelectedSwatch(swatch.color);
                  setTotalAmount(swatch.price);
                }}
              ></button>
            ))}
          </div>
          <p className="text-center m-2 text-sm">
            Click on the swatches to change the T-shirt color.
          </p>
        </div>
        <div>Total Amount :- $ {totalAmount}</div>
        <div>
          <h1 className="font-bold">Your T-Shirt Texture</h1>
          <div className="flex justify-center mt-4">
            {texture.map((swatch, index) => (
              <button
                key={swatch.texture}
                className={`m-1 rounded-full w-8 h-8 bg-neutral-300`}
                style={{
                  border:
                    selectedTexture === swatch.texture
                      ? "2px solid black"
                      : "none",
                }}
                onClick={() => {
                  setSelectedTexture(swatch.texture);
                  setTotalAmount(swatch.price);
                }}
              >
                T{++index}
              </button>
            ))}
          </div>
          <p className="text-center m-2 text-sm">
            Click on the swatches to change the T-shirt Texture.
          </p>
        </div>
      </header>
      <div ref={containerRef}></div>
    </>
  );
};

export default ThreeScene;
