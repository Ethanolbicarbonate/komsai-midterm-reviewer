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
    // Convert lists to expandable format
    convertListToExpandable('.advantages');
    convertListToExpandable('.disadvantages');
    
    // Initialize expandable lists
    initExpandableLists();
    
    // Process toggle containers
    const toggleContainers = document.querySelectorAll('.toggle-container');
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
    
    // The sidebar functionality is now moved to each page's script
    // to ensure it works properly with the dynamically loaded navbar
    // HOWEVER, we'll keep it here too as a fallback for pages that might not have
    // the inline script and are still using the old method
    
    // Check if sidebar exists and hasn't been initialized by the page-specific script
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebar && sidebarToggle && !window.sidebarInitialized) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Change the toggle icon appearance
            const toggleIcon = sidebarToggle.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.classList.toggle('active');
            }
        });
        
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
    }
});

function openTab(evt, tabName) {
    // Find the parent tab group (closest parent with class "tabs" or a container)
    var tabGroup = evt.currentTarget.closest('.tabs').parentElement;
    
    // Hide all tab content within this group
    var tabContents = tabGroup.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].className = tabContents[i].className.replace(" active", "");
    }
    
    // Remove active class from all tabs within this group
    var tabs = tabGroup.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    
    // Show the current tab and add active class
    document.getElementById(tabName).className += " active";
    evt.currentTarget.className += " active";
}
