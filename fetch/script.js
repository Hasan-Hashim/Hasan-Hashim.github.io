const repoContainer = document.getElementById('repo-container');
const searchButton = document.getElementById('search-button');
const githubUsernameInput = document.getElementById('github-username');

// Default GitHub username
const defaultUsername = 'your-github-username';

// Fetch repositories for a given username
async function fetchRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('User not found');
        const repos = await response.json();
        displayRepositories(repos);
    } catch (error) {
        console.error(error);
        repoContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Display repositories in the DOM
function displayRepositories(repos) {
    repoContainer.innerHTML = '';
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        repoCard.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description available'}</p>
            <p><span>Created:</span> ${new Date(repo.created_at).toLocaleDateString()}</p>
            <p><span>Updated:</span> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p><span>Watchers:</span> ${repo.watchers_count}</p>
        `;
        repoContainer.appendChild(repoCard);
    });
}

// Event listeners
searchButton.addEventListener('click', () => {
    const username = githubUsernameInput.value.trim();
    if (username) {
        fetchRepositories(username);
    }
});

// Load default profile on page load
window.addEventListener('load', () => {
    fetchRepositories(defaultUsername);
});
