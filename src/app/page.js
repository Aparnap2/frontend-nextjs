'use client'
// Import necessary modules
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Navbar from './navbar';
import About from './about';
import Card from './card';
// Import necessary libraries and components

function HomePage() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const foregroundStarsRef = useRef([]);
  const isMouseClickedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = canvas ? new THREE.WebGLRenderer({ antialias: true, canvas }) : null;

    if (renderer) {
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create stars and foreground stars with more randomness
      createStars(scene, 200, 0xffffff, starsRef);
      createStars(scene, 20, 0xffff00, foregroundStarsRef);

      // Event listeners for mouse, touch, and scroll
      window.addEventListener('click', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
      window.addEventListener('scroll', handleInteraction);

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      const animate = () => {
        requestAnimationFrame(animate);

        // Background starfield animation
        starsRef.current.forEach((star) => {
          star.rotation.x += 0.001;
          star.rotation.y += 0.002;
          star.rotation.z += 0.003;
        });

        // Handle interactive foreground stars
        if (isMouseClickedRef.current) {
          foregroundStarsRef.current.forEach((star) => {
            const randomVector = new THREE.Vector3(
              Math.random() * 2 - 1,
              Math.random() * 2 - 1,
              Math.random() * 2 - 1
            ).normalize();
            star.velocity = randomVector.multiplyScalar(5);
          });
          isMouseClickedRef.current = false;
        }

        // Update foreground stars based on velocity
        foregroundStarsRef.current.forEach((star) => {
          if (star.velocity) {
            star.position.add(star.velocity);
            star.velocity.multiplyScalar(0.95); // Gradually slow down
          }
        });

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup function for removing event listeners
      return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const createStars = (scene, count, color, starsArray) => {
    const starGeometry = new THREE.SphereGeometry(0.1);
    const starMaterial = new THREE.MeshBasicMaterial({ color });

    for (let i = 0; i < count; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.x = Math.random() * 100 - 50;
      star.position.y = Math.random() * 100 - 50;
      star.position.z = Math.random() * 100 - 50;
      scene.add(star);
      starsArray.current.push(star);
    }
  };

  const handleInteraction = () => {
    isMouseClickedRef.current = true;
  };

  return (
    <div>
    {/* Navigation Bar */}
    <Navbar />

    {/* About Section */}
    <About />

    {/* Cards Section */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Card title="Card 1" content="Content for Card 1" />
      <Card title="Card 2" content="Content for Card 2" />
      <Card title="Card 3" content="Content for Card 3" />
    </div>

    {/* Canvas for Three.js animation */}
    <canvas ref={canvasRef}></canvas>
  </div>
      
    
  );
}

export default HomePage;
