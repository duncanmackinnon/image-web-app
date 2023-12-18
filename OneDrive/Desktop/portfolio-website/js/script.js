document.addEventListener('DOMContentLoaded', function () {
    // Update the year dynamically in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function () {
            // Toggle dark mode for body, header, and footer
            const isDarkMode = document.body.classList.toggle('dark-mode');
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');
            if (header && footer) {
                header.classList.toggle('dark-mode');
                footer.classList.toggle('dark-mode');
            }

            // Save the theme state in local storage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (header && footer) {
            header.classList.add('dark-mode');
            footer.classList.add('dark-mode');
        }
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

