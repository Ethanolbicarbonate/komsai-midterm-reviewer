function initExpandableLists() {
    const items = document.querySelectorAll('.expandable-item');
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

function convertListToExpandable(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
        const list = container.querySelector('ul');
        if (!list) return;
        
        list.classList.add('expandable-list');
        const listItems = list.querySelectorAll('li');
        
        listItems.forEach(li => {
            const strongElement = li.querySelector('strong');
            if (!strongElement) return;
            
            const title = strongElement.textContent;
            const fullText = li.innerHTML;
            const description = fullText.replace(strongElement.outerHTML, '').trim();
            
            li.className = 'expandable-item';
            li.innerHTML = `
                <div class="expandable-title">
                    <span>${title}</span>
                </div>
                <div class="expandable-description">
                    ${description}
                </div>
            `;
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    convertListToExpandable('.advantages');
    
    convertListToExpandable('.disadvantages');
    
    initExpandableLists();
});
document.addEventListener('DOMContentLoaded', function() {
// Get all toggle containers
const toggleContainers = document.querySelectorAll('.toggle-container');

// Add event listeners to each container
toggleContainers.forEach(function(container) {
    const toggleButton = container.querySelector('.toggle-button');
    const toggleContent = container.querySelector('.toggle-content');
    
    if (toggleButton && toggleContent) {
    toggleButton.addEventListener('click', function() {
        // Toggle content visibility
        if (toggleContent.style.display === 'block') {
        toggleContent.style.display = 'none';
        toggleButton.textContent = 'Show Content';
        toggleButton.classList.remove('active');
        } else {
        toggleContent.style.display = 'block';
        toggleButton.textContent = 'Hide Content';
        toggleButton.classList.add('active');
        }
    });
    }
});
});

function openTab(evt, tabName) {
    // Hide all tab content
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].className = tabContents[i].className.replace(" active", "");
    }

    // Remove active class from all tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    // Show the current tab and add active class
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}

// Add this to your reviewer.js file

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Change the toggle icon appearance
            const toggleIcon = sidebarToggle.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.classList.toggle('active');
            }
        });
    }
    
    // Subject accordions
    const subjectNames = document.querySelectorAll('.subject-name');
    
    subjectNames.forEach(subject => {
        subject.addEventListener('click', function() {
            const parentItem = this.parentElement;
            const isActive = parentItem.classList.contains('active');
            
            // Close all other subjects
            document.querySelectorAll('.subject-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle this subject
            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });
    
    // Automatically expand the subject containing the active page
    const activePage = document.querySelector('.chapter-list a.active');
    if (activePage) {
        let parentSubject = activePage.closest('.subject-item');
        if (parentSubject) {
            parentSubject.classList.add('active');
        }
    }
    
    // Add additional CSS for toggle icon animation
    const style = document.createElement('style');
    style.textContent = `
        .toggle-icon.active {
            background-color: transparent;
        }
        
        .toggle-icon.active:before {
            transform: rotate(45deg);
            top: 0;
        }
        
        .toggle-icon.active:after {
            transform: rotate(-45deg);
            bottom: 0;
        }
        
        .subject-item.active .chapter-list {
            max-height: 500px;
        }
    `;
    document.head.appendChild(style);
});