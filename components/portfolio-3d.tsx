"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Text3D,
  Float,
  Environment,
  ContactShadows,
  Line,
  Sparkles,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei"
import { Suspense, useRef, useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Head from 'next/head';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ArrowUp, ExternalLink, Code, Smartphone, Globe, Instagram } from "lucide-react"
import * as THREE from "three"
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing"
import { projects } from "./service/projects"
import ContactSection from "./ui/ContactSection"
import Projects from "./ui/ProjectCard"


// Advanced Particle System
function AdvancedParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 3000

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Create a more structured distribution
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Color variation
      const hue = (Math.random() * 0.1 + 0.9) % 1
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, colors, sizes }
  }, [particleCount])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.01) * 0.01
        positions[i] += Math.cos(state.clock.elapsedTime * 0.3 + positions[i + 2] * 0.01) * 0.005
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[particles.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Dynamic Network with Advanced Connections
function AdvancedNetworkLines() {
  const linesRef = useRef<THREE.Group>(null)
  const [connections, setConnections] = useState<Array<[number, number, number]>>([])

  const networkNodes = useMemo(() => {
    const nodes = []
    for (let i = 0; i < 30; i++) {
      nodes.push([(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10] as [
        number,
        number,
        number,
      ])
    }
    return nodes
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      linesRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.05) * 2
    }

    // Dynamic connection updates
    if (Math.floor(state.clock.elapsedTime * 2) % 3 === 0) {
      const newConnections = []
      for (let i = 0; i < networkNodes.length; i++) {
        const nearbyNodes = networkNodes.filter((node, j) => {
          if (i === j) return false
          const distance = Math.sqrt(
            Math.pow(node[0] - networkNodes[i][0], 2) +
            Math.pow(node[1] - networkNodes[i][1], 2) +
            Math.pow(node[2] - networkNodes[i][2], 2),
          )
          return distance < 8
        })

        nearbyNodes.slice(0, 2).forEach((node) => {
          newConnections.push([networkNodes[i], node])
        })
      }
      setConnections(newConnections.slice(0, 40))
    }
  })

  return (
    <group ref={linesRef}>
      {networkNodes.map((node, i) => (
        <group key={i}>
          {/* Enhanced nodes with pulsing effect */}
          <Float speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh position={node}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={0.5 + Math.sin(i) * 0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </Float>

          {/* Data flow particles */}
          <Sparkles count={3} scale={[0.5, 0.5, 0.5]} size={2} speed={0.5} position={node} color="#ff6b6b" />
        </group>
      ))}

      {/* Dynamic connection lines */}
      {connections.map((connection, i) => (
        <Line
          key={i}
          points={connection}
          color="#374151"
          lineWidth={2}
          transparent
          opacity={0.6}
          dashed
          dashScale={50}
          dashSize={1}
          gapSize={0.5}
        />
      ))}
    </group>
  )
}

// Morphing Geometric Elements
function MorphingGeometry({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + delay
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + delay
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.5
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.4, 2]} />
        <MeshDistortMaterial
          color="#ef4444"
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#ef4444"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

// Permanent 3D Text for Roles (Always visible after popups)
function PermanentRoleText({ showPermanent }: { showPermanent: boolean }) {
  const webDevRef = useRef<THREE.Group>(null)
  const mobileDevRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (webDevRef.current) {
      webDevRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      webDevRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.03

      // Show/hide animation
      const targetScale = showPermanent ? 1 : 0
      webDevRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }

    if (mobileDevRef.current) {
      mobileDevRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.4 + 1) * 0.2
      mobileDevRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.03

      // Show/hide animation
      const targetScale = showPermanent ? 1 : 0
      mobileDevRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <>
      <group ref={webDevRef} position={[1, 2, -1]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.15}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          position={[-3, 0, 0]}
        >
          Web Developer
          <meshStandardMaterial
            color="#ef4444"
            metalness={0.7}
            roughness={0.1}
            emissive="#ef4444"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </group>

      <group ref={mobileDevRef} position={[0.5, -1, -1]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.6}
          height={0.12}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          position={[-4, 0, 0]}
        >
          Mobile Application Developer
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.7}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </group>
    </>
  )
}

// Interactive Logo Badge with Animation
function InteractiveLogo() {
  const logoRef = useRef<THREE.Group>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.z = isPlaying
        ? state.clock.elapsedTime * 2
        : Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={logoRef} position={[-5, -2.5, 2]} onClick={() => setIsPlaying(!isPlaying)}>
        {/* Outer ring with glow */}
        <mesh>
          <torusGeometry args={[1, 0.08, 12, 48]} />
          <meshStandardMaterial
            color="#374151"
            metalness={0.8}
            roughness={0.2}
            emissive="#ef4444"
            emissiveIntensity={isPlaying ? 0.3 : 0.1}
          />
        </mesh>

        {/* Inner sphere */}
        <Sphere args={[0.7, 32, 32]}>
          <MeshDistortMaterial
            color="#1f2937"
            metalness={0.9}
            roughness={0.1}
            distort={isPlaying ? 0.3 : 0.1}
            speed={2}
            emissive="#ef4444"
            emissiveIntensity={0.2}
          />
        </Sphere>

        {/* Central icon */}
        <mesh position={[0, 0, 0.8]}>
          <cylinderGeometry args={[0.15, 0.05, 0.4, 6]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Scene with Advanced Lighting
function Scene({ showPermanentText }: { showPermanentText: boolean }) {
  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-8, 8, 8]} intensity={1.2} color="#ef4444" />
      <pointLight position={[8, -8, -8]} intensity={0.8} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" castShadow />

      {/* Main Elements */}
      <AdvancedParticleSystem />
      <AdvancedNetworkLines />
      <InteractiveLogo />
      <PermanentRoleText showPermanent={showPermanentText} />

      {/* Morphing Geometries */}
      <MorphingGeometry position={[-6, 3, -3]} delay={0} />
      <MorphingGeometry position={[6, 2, -4]} delay={1.5} />
      <MorphingGeometry position={[-4, -1, 3]} delay={3} />
      <MorphingGeometry position={[5, -2, 2]} delay={4.5} />

      {/* Environment */}
      <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={25} blur={3} far={6} />
      <Environment preset="night" />

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  )
}

export function Portfolio3D() {
  const [activeSection, setActiveSection] = useState("about")
  const [showWebDevPopup, setShowWebDevPopup] = useState(false)
  const [showMobileDevPopup, setShowMobileDevPopup] = useState(false)
  const [showPermanentText, setShowPermanentText] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact Us" },
  ]

  const ProjectsPage: React.FC = () => {
    return (
      <div>
        <Head>
          <title>My Projects</title>
          <meta name="description" content="Showcasing my portfolio projects" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1>My Portfolio Projects</h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>
      </div>
    );
  };

  useEffect(() => {
    // Phase 1: Web Developer popup (2s - 5s)
    const webDevTimer = setTimeout(() => {
      setShowWebDevPopup(true)
      setTimeout(() => setShowWebDevPopup(false), 3000) // Show for 3 seconds
    }, 2000)

    // Phase 2: Mobile Developer popup (6s - 9s)
    const mobileDevTimer = setTimeout(() => {
      setShowMobileDevPopup(true)
      setTimeout(() => setShowMobileDevPopup(false), 3000) // Show for 3 seconds
    }, 6000)

    // Phase 3: Show permanent 3D text (10s onwards)
    const permanentTimer = setTimeout(() => {
      setShowPermanentText(true)
    }, 10000)

    return () => {
      clearTimeout(webDevTimer)
      clearTimeout(mobileDevTimer)
      clearTimeout(permanentTimer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const refs = {
      about: aboutSectionRef,
      projects: projectsSectionRef,
      contact: contactSectionRef,
    }

    refs[sectionId as keyof typeof refs]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate form submission - replace with actual email service
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "shalinirvithanage@gmail.com",
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Globe className="h-6 w-6" />
      case "mobile":
        return <Smartphone className="h-6 w-6" />
      default:
        return <Code className="h-6 w-6" />
    }
  }

  return (
    <div className="relative">
      {/* Hero Section with 3D Scene */}
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        {/* Popup Overlays */}
        <AnimatePresence>
          {/* Web Developer Popup */}
          {showWebDevPopup && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-red-500/20 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-radial from-red-500/30 via-red-500/10 to-transparent"></div>
              </div>
              <motion.div
                className="text-8xl font-bold text-red-400 text-center z-30"
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0, rotateY: 180 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                WEB DEVELOPER
              </motion.div>
            </motion.div>
          )}

          {/* Mobile Developer Popup */}
          {showMobileDevPopup && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent"></div>
              </div>
              <motion.div
                className="text-6xl font-bold text-blue-400 text-center z-30 px-8 leading-tight"
                initial={{ scale: 0, rotateX: -180 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0, rotateX: 180 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                MOBILE APPLICATION DEVELOPER
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 12], fov: 55 }}
          className="absolute inset-0"
          shadows
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene showPermanentText={showPermanentText} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 4}
              maxAzimuthAngle={Math.PI / 3}
              minAzimuthAngle={-Math.PI / 3}
              autoRotate={false}
              dampingFactor={0.05}
              enableDamping
            />
          </Suspense>
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Navigation - Top Right */}
          <motion.div
            className="absolute top-8 right-8 flex gap-4 pointer-events-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={`
                    backdrop-blur-md border transition-all duration-300 font-medium
                    ${activeSection === item.id
                      ? "bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:text-red-300"
                    }
                  `}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Profile Card - Left Side */}
          <motion.div
            className="absolute left-0 top-0 h-full w-80 pointer-events-auto backdrop-blur-md bg-white/5 border-r border-white/10 flex flex-col justify-center px-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            {/* Profile Content */}
            <div className="space-y-8">
              {/* Name Only */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-wide leading-tight">Shalini Vithanage Perera</h1>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <span className="text-red-300 font-medium text-sm">React</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                  <span className="text-blue-300 font-medium text-sm">Flutter</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <span className="text-green-300 font-medium text-sm">Node.js</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                  <span className="text-purple-300 font-medium text-sm">Next.js</span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                  <span className="text-yellow-300 font-medium text-sm">JavaScript</span>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                  <span className="text-orange-300 font-medium text-sm">TypeScript</span>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
                  <span className="text-pink-300 font-medium text-sm">Dart</span>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                  <span className="text-blue-300 font-medium text-sm">AI/ML</span>
                </div>
              </div>



              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <SocialLinksSection />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Me Section */}
      <div
        ref={aboutSectionRef}
        className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative"
      >
        {/* Back to Top Button */}
        <motion.button
          className="fixed top-8 right-8 z-50 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 backdrop-blur-md rounded-full p-3 transition-all duration-300"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>

        <div className="container mx-auto px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* About Me Header */}
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-white mb-6">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto"></div>
            </div>

            {/* About Me Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Hi! I'm Shalini Vithanage Perera, a passionate and driven final-year undergraduate at the Faculty of
                  Applied Sciences, Wayamba University of Sri Lanka, pursuing a B.Sc. (Joint Major) in Computing and
                  Information Systems, Mathematics, and Statistics. I'm deeply interested in creating meaningful digital
                  experiences through a combination of design and technology. My work focuses on building modern,
                  responsive applications using tools like React, Next.js, Node.js, and Flutter. I'm also fascinated by
                  the potential of artificial intelligence and machine learning, and I enjoy exploring how these
                  technologies can enhance functionality and user experience. I'm constantly learning, experimenting,
                  and looking for new ways to bring ideas to life through code.
                </p>
              </div>

              {/* Skills Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              >
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-500/20 transition-all duration-300">
                  <span className="text-red-300 font-medium text-lg">React & Next.js</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center hover:bg-blue-500/20 transition-all duration-300">
                  <span className="text-blue-300 font-medium text-lg">Flutter</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center hover:bg-green-500/20 transition-all duration-300">
                  <span className="text-green-300 font-medium text-lg">Node.js</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center hover:bg-purple-500/20 transition-all duration-300">
                  <span className="text-purple-300 font-medium text-lg">AI & ML</span>
                </div>
              </motion.div>


            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div
        ref={projectsSectionRef}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative py-20"
      >
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Projects Header */}
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-white mb-6">My Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills in web development, mobile applications, and
                emerging technologies.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group"
                >

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white">
                          {getProjectIcon(project.type)}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {/* Project Links */}
                      <div className="flex gap-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-white hover:text-red-400 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        </a>

                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-white hover:text-blue-400 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live
                          </Button>
                        </a>

                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}


            </div>

          </motion.div>

        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactSectionRef}>
        <ContactSection />
      </div>
    </div>
  )
}


// ✅ Define outside the component
const socialLinks = [
  { icon: Github, url: process.env.NEXT_PUBLIC_GITHUB_URL },
  { icon: Linkedin, url: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { icon: Instagram, url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
];

// ✅ Define your component separately
const SocialLinksSection: React.FC = () => {
  return (
    <div className="flex justify-center gap-4">
      {socialLinks.map((social, index) => {
        if (!social.url) {
          console.warn(
            `Social URL for ${social.icon.displayName || 'an icon'} is not defined in environment variables.`
          );
          return null;
        }

        return (
          <motion.div key={index} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.icon.displayName || 'social'} page`}
            >
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-red-400 hover:bg-red-500/20 backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 h-12 w-12"
              >
                <social.icon className="h-6 w-6" />
              </Button>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
};



