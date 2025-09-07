const AOS = window.AOS 

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
})

const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  showNotification("Message sent successfully! I'll get back to you soon.", "success")
  contactForm.reset()
})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#6366f1"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 50)
  }
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".project-card, .achievement-card, .service-card")
  elementsToAnimate.forEach((el) => {
    el.classList.add("loading")
    observer.observe(el)
  })
})

function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElement = entry.target.querySelector(".number")
        if (numberElement && !numberElement.classList.contains("animated")) {
          numberElement.classList.add("animated")
          const target = Number.parseInt(numberElement.textContent)
          animateCounter(numberElement, target)
        }
      }
    })
  },
  { threshold: 0.5 },
)

document.addEventListener("DOMContentLoaded", () => {
  const experienceBadges = document.querySelectorAll(".experience-badge")
  experienceBadges.forEach((badge) => {
    counterObserver.observe(badge)
  })
})

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    revealObserver.observe(section)
  })
})

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedScrollHandler = debounce(() => {
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

function createWhatsAppTooltip() {
  const whatsappFloat = document.querySelector(".whatsapp-float")
  if (whatsappFloat) {
    const tooltip = document.createElement("div")
    tooltip.className = "whatsapp-tooltip"
    tooltip.innerHTML = "Chat with me on WhatsApp"

    tooltip.style.cssText = `
      position: absolute;
      right: 70px;
      top: 50%;
      transform: translateY(-50%);
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1001;
      pointer-events: none;
    `

    const arrow = document.createElement("div")
    arrow.style.cssText = `
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid #333;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    `
    tooltip.appendChild(arrow)

    whatsappFloat.appendChild(tooltip)

    whatsappFloat.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1"
      tooltip.style.visibility = "visible"
    })

    whatsappFloat.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0"
      tooltip.style.visibility = "hidden"
    })
  }
}

document.addEventListener("DOMContentLoaded", createWhatsAppTooltip)

function downloadCV() {
  const link = document.createElement("a")


  const cvContent = `
Dr. Omolola Anthonia Eddo - Curriculum Vitae

CONTACT INFORMATION
Email: eddoomolola@gmail.com
Phone: +2348059286631
Location: Nigeria & Middle East

EDUCATION
- Doctorate Degree in Education and Community Development
- Master's Degree
- Bachelor's Degree

PROFESSIONAL EXPERIENCE
- International Languages Teacher (English, French, Mandarin)
- Secretary General, Nigerians in the Middle East Community (NGO)
- Business Entrepreneur in Sustainable Agriculture
- Art and Conceptual Photographer

CORE COMPETENCIES
- Multilingual Teaching (English, French, Yoruba, Mandarin)
- Educational Leadership and Development
- Community Engagement and Social Responsibility
- Sustainable Agriculture and Food Production
- Art and Conceptual Photography
- Media and Content Creation

ACHIEVEMENTS
- Empowered young people globally through X platform advocacy
- Led "Pop Arts Week 2013" - "Everyone is an Actor" photography initiative
- Developed sustainable agriculture business venture
- Promoted cultural integration in Middle East diaspora community

SERVICES OFFERED
- Modern Foreign Languages Teaching
- Educational Leadership and Coaching
- Community and Corporate Social Responsibility
- Art and Conceptual Photography
- Media and Content Creation
- Professional and Personal Life Coaching

For more information, visit: [https://dr_omolola.netlify.app/]
  `

  const blob = new Blob([cvContent], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)

  link.href = url
  link.download = "Dr_Omolola_Eddo_CV.txt"

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)

  showNotification("CV downloaded successfully!", "success")
}

function initializeMobileNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })

  navMenu.addEventListener("click", (e) => {
    e.stopPropagation()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

document.addEventListener("DOMContentLoaded", initializeMobileNavigation)
