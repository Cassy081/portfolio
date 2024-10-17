console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/Cassy081/portfolio', title: 'GitHub' },
    { url: 'contact/', title: 'Contact' }
  ];


let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }

    if (!a.href.startsWith(location.origin)) {
        a.target = "_blank"; 
    }

    nav.append(a);
};


document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select id="theme-selector">
			<option value="light dark">Automatic</option>
			<option value="dark">Dark</option>
			<option value="light">Light</option>
		</select>
	</label>`
);

// Select the dropdown element
const select = document.querySelector('#theme-selector');

// Function to set the color scheme and update styles
function setColorScheme(scheme) {
    console.log('color scheme changed to', scheme); // Log the change
    document.documentElement.style.setProperty('color-scheme', scheme);
    
    // Change the background and text color based on selected theme
    if (scheme === 'dark') {
        document.documentElement.style.setProperty('background-color', '#1a1a1a'); // Dark background
        document.documentElement.style.setProperty('color', '#ffffff'); // Light text
    } else if (scheme === 'light') {
        document.documentElement.style.setProperty('background-color', '#ffffff'); // Light background
        document.documentElement.style.setProperty('color', '#000000'); // Dark text
    } else {
        // Reset to default (for Automatic)
        document.documentElement.style.removeProperty('background-color');
        document.documentElement.style.removeProperty('color');
    }
}

// Check for saved color scheme in localStorage on page load
if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme; // Retrieve saved color scheme
    setColorScheme(savedScheme); // Set the scheme on page load
    select.value = savedScheme; // Update the <select> element to match
} else {
    // If no saved preference, default to Automatic
    setColorScheme('light dark');
}

// Add event listener for theme selection
select.addEventListener('input', function (event) {
    const newScheme = event.target.value; // Get the new value from the dropdown
    setColorScheme(newScheme); // Set the new color scheme
    localStorage.colorScheme = newScheme; // Save the user's preference
});
