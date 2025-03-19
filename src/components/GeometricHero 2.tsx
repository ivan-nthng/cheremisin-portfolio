'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function GeometricHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mousePosition = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return
            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }

        // Initial setup
        handleResize()
        containerRef.current.appendChild(renderer.domElement)
        camera.position.z = 5

        // Create geometric shapes
        const shapes: THREE.Mesh[] = []
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(0.8, 0),
            new THREE.TetrahedronGeometry(0.6, 0),
            new THREE.DodecahedronGeometry(0.7, 0),
        ]

        geometries.forEach((geometry, i) => {
            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.7,
                metalness: 0.1,
                wireframe: i % 2 === 0,
            })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = (Math.random() - 0.5) * 3
            mesh.position.y = (Math.random() - 0.5) * 3
            mesh.rotation.x = Math.random() * Math.PI
            mesh.rotation.y = Math.random() * Math.PI
            shapes.push(mesh)
            scene.add(mesh)
        })

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return
            mousePosition.current = {
                x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
            }
        }

        // Animation
        const animate = () => {
            requestAnimationFrame(animate)

            shapes.forEach((shape, i) => {
                // Rotate continuously
                shape.rotation.x += 0.002
                shape.rotation.y += 0.003

                // Move based on mouse position
                const targetX = mousePosition.current.x * 0.5
                const targetY = mousePosition.current.y * 0.5
                shape.position.x += (targetX - shape.position.x) * 0.02
                shape.position.y += (targetY - shape.position.y) * 0.02
            })

            renderer.render(scene, camera)
        }

        // Event listeners
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        animate()

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            containerRef.current?.removeChild(renderer.domElement)
            geometries.forEach((geometry) => geometry.dispose())
            shapes.forEach((shape) => {
                if (shape.material instanceof THREE.Material) {
                    shape.material.dispose()
                }
            })
            renderer.dispose()
        }
    }, [])

    return <div ref={containerRef} className="w-full h-full min-h-[400px]" />
}
