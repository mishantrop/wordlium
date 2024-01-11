/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

var startConfetti
// @ts-ignore
var stopConfetti

(function() {
    const maxParticleCount = 150
    const particleSpeed = 2
    // @ts-ignore
    startConfetti = startConfettiInner
    stopConfetti = stopConfettiInner
    // @ts-ignore
    const toggleConfetti = toggleConfettiInner
    // @ts-ignore
    const removeConfetti = removeConfettiInner
    const colors = ['DodgerBlue', 'OliveDrab', 'Gold', 'Pink', 'SlateBlue', 'LightBlue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson']
    let streamingConfetti = false
    // @ts-ignore
    let animationTimer = null
    // @ts-ignore
    let particles = []
    let waveAngle = 0

    // @ts-ignore
    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0]
        particle.x = Math.random() * width
        particle.y = Math.random() * height - height
        particle.diameter = Math.random() * 10 + 5
        particle.tilt = Math.random() * 10 - 10
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05
        particle.tiltAngle = 0
        return particle
    }

    function startConfettiInner() {
        const width = window.innerWidth
        const height = window.innerHeight
        // @ts-ignore
        window.requestAnimFrame = (function() {
            // @ts-ignore
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                return window.setTimeout(callback, 16.6666667)
            }
        })()
        let canvas = document.getElementById('confetti-canvas')
        if (canvas === null) {
            canvas = document.createElement('canvas')
            canvas.setAttribute('id', 'confetti-canvas')
            canvas.setAttribute('style', 'display: block; z-index: 999999; pointer-events: none; max-width: 100%; position: absolute; top: 0; left: 0; bottom: 0; right: 0;')
            document.body.appendChild(canvas)
            // @ts-ignore
            canvas.width = width
            // @ts-ignore
            canvas.height = height
            window.addEventListener('resize', function() {
                // @ts-ignore
                canvas.width = window.innerWidth
                // @ts-ignore
                canvas.height = window.innerHeight
            }, true)
        }
        // @ts-ignore
        const context = canvas.getContext('2d')
        while (particles.length < maxParticleCount) {
            particles.push(resetParticle({}, width, height))
        }
        streamingConfetti = true
        // @ts-ignore
        if (animationTimer === null) {
            (function runAnimation() {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight)
                if (particles.length === 0)
                    animationTimer = null
                else {
                    updateParticles()
                    drawParticles(context)
                    // @ts-ignore
                    animationTimer = requestAnimFrame(runAnimation)
                }
            })()
        }
    }

    function stopConfettiInner() {
        streamingConfetti = false
    }

    function removeConfettiInner() {
        stopConfetti()
        particles = []
    }

    function toggleConfettiInner() {
        if (streamingConfetti)
            stopConfettiInner()
        else
            startConfettiInner()
    }

    // @ts-ignore
    function drawParticles(context) {
        let particle
        let x
        for (let i = 0; i < particles.length; i++) {
            // @ts-ignore
            particle = particles[i]
            context.beginPath()
            context.lineWidth = particle.diameter
            context.strokeStyle = particle.color
            x = particle.x + particle.tilt
            context.moveTo(x + particle.diameter / 2, particle.y)
            context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2)
            context.stroke()
        }
    }

    function updateParticles() {
        const width = window.innerWidth
        const height = window.innerHeight
        let particle
        waveAngle += 0.01
        for (let i = 0; i < particles.length; i++) {
            // @ts-ignore
            particle = particles[i]
            if (!streamingConfetti && particle.y < -15)
                particle.y = height + 100
            else {
                particle.tiltAngle += particle.tiltAngleIncrement
                particle.x += Math.sin(waveAngle)
                particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5
                particle.tilt = Math.sin(particle.tiltAngle) * 15
            }
            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if (streamingConfetti && particles.length <= maxParticleCount)
                    resetParticle(particle, width, height)
                else {
                    // @ts-ignore
                    particles.splice(i, 1)
                    i--
                }
            }
        }
    }
})()
