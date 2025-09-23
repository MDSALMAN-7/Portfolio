

      // Mobile menu toggle
      const menuBtn = document.getElementById('menuBtn')
      const mobilePanel = document.getElementById('mobilePanel')
      const menuIcon = document.getElementById('menuIcon')
      let open = false
      menuBtn.addEventListener('click', () => {
        open = !open
        mobilePanel.classList.toggle('hidden', !open)
        menuIcon.innerHTML = open
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
      })

      
     // Smooth scroll for nav links
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href')
          if (href.startsWith('#')) {
            e.preventDefault()
            document
              .querySelector(href)
              .scrollIntoView({ behavior: 'smooth', block: 'start' })
            if (window.innerWidth < 768) {
              mobilePanel.classList.add('hidden')
              open = false
              menuIcon.innerHTML =
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
            }
          }
        })
      })


      // Optional: highlight nav on scroll
      const sections = document.querySelectorAll('main section[id]')
      const navLinks = document.querySelectorAll('.nav-link')
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const id = e.target.id
            if (e.isIntersecting) {
              navLinks.forEach((n) =>
                n.classList.toggle(
                  'text-primary',
                  n.getAttribute('href') === '#' + id
                )
              )
            }
          })
        },
        { threshold: 0.45 }
      )
      sections.forEach((s) => obs.observe(s))

      // small enhancement: reduce header bg on scroll
      const header = document.querySelector('header')
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30)
          header.classList.add('backdrop-blur', 'bg-slate-900/60', 'shadow-xl')
        else
          header.classList.remove(
            'backdrop-blur',
            'bg-slate-900/60',
            'shadow-lg'
          )
      })

      
    // Typing effect
    const typing = document.getElementById('typing');
    const phrases = ['accessible UIs', 'full‑stack apps', 'reusable components', 'scalable APIs'];
    let pi = 0, ci = 0, deleting = false;
    function typeTick(){
      const current = phrases[pi];
      typing.textContent = current.slice(0, ci);
      if(!deleting && ci < current.length) { ci++; }
      else if(deleting && ci > 0) { ci--; }
      else if(!deleting && ci === current.length) { deleting = true; setTimeout(typeTick, 900); return; }
      else { deleting = false; pi = (pi+1) % phrases.length; }
      setTimeout(typeTick, deleting ? 55 : 75);
    }
    typeTick();

// form accept data login
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  result.textContent = 'Please wait...';

  const formData = new FormData(form);
  const json = JSON.stringify(Object.fromEntries(formData));

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: json
    });
    const data = await res.json();
    result.textContent = data.message || (res.ok ? 'Sent!' : 'Error');

    // ✅ Toast message
    Toastify({
      text: data.message || (res.ok ? "Sent!" : "Error"),
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: res.ok ? "green" : "red"
    }).showToast();

    if (res.ok) form.reset();

    // Remove message after 3 seconds
    setTimeout(() => {
      result.textContent = '';
    }, 3000);
  } catch (err) {
    result.textContent = 'Something went wrong!';

    Toastify({
      text: "Something went wrong!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "red"
    }).showToast();

    setTimeout(() => result.textContent = '', 3000);

    console.error(err);
  }
});


// for image slide
 const images = [
  "image/CourseAcademy1.png",
  "image/CourseAcademy2.png",
  "image/CourseAcademy3.png",
  "image/CourseAcademy4.png",
  "image/CourseAcademy5.png",
  "image/CourseAcademy6.png",
  "image/CourseAcademy7.png"
];

let index = 0;
const slider = document.getElementById("sliderImage");

function slideImages() {
  // Fade out
  slider.classList.add("opacity-0");

  setTimeout(() => {
    // Change image after fade out
    index++;
    if (index >= images.length) index = 0;
    slider.src = images[index];

    // Fade in
    slider.classList.remove("opacity-0");
  }, 2000); // 500ms fade out duration
}

// Slide every 2 seconds
setInterval(slideImages, 2000);