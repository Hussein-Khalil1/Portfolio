document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Update URL without refreshing
            history.pushState(null, null, targetId);
        });
    });
    
    // Project details toggle
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            // Change button text based on state
            if (details.classList.contains('active')) {
                this.textContent = 'Hide Details';
            } else {
                this.textContent = 'View Details';
            }
        });
    });
    
//  download resume
  const resumeFilename = "Hussein Khalil's Resume.pdf";
  const cleanFilename = "Hussein_Khalil_Resume.pdf"; // For downloaded file
  
  // View in new tab
  document.querySelector('.view-resume-btn').addEventListener('click', () => {
    window.open(encodeURI(resumeFilename), '_blank');
  });
  
  // Download version
  document.querySelector('.download-resume-btn').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Method 1: Standard download
    try {
      const link = document.createElement('a');
      link.href = encodeURI(resumeFilename);
      link.download = cleanFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    // Fallback if Method 1 fails
    catch (err) {
      console.log("Standard download failed, trying alternative method...");
      
      // Method 2: Fetch + Blob (works cross-origin)
      fetch(encodeURI(resumeFilename))
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = cleanFilename;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 100);
        })
        .catch(() => {
          // Ultimate fallback
          window.open(encodeURI(resumeFilename), '_blank');
        });
    }
  });

        // button to top
        const backToTopBtn = document.getElementById("backToTopBtn");

        window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add("show"); // Show after 200px
        } else {
            backToTopBtn.classList.remove("show"); // Hide if <200px
        }
        });

        backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});