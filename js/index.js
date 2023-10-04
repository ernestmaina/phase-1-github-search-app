
const githubform = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const  userlist= document.getElementById('user-list');
const userRepos = document.getElementById('repos-list');

githubform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = searchInput.value.trim();

    if (username === '') {
        alert('Please enter a GitHub username.');
        return;
    }

    try {
        // Search for GitHub users
        const userResponse = await fetch(`https://api.github.com/search/users?q=${username}`);
        const userData = await userResponse.json();
        const users = userData.items;

        // Display user information
        searchResults.innerHTML = '';
        users.forEach((user) => {
            const userElement = document.createElement('div');
            userElement.innerHTML = `
                <h2>${user.login}</h2>
                <img src="${user.avatar_url}" alt="${user.login}'s avatar">
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;
            userElement.addEventListener('click', async () => {
                // Fetch user repositories
                const repoResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
                const reposData = await repoResponse.json();
                const repos = reposData;

                // Display user repositories
                userRepos.innerHTML = '';
                repos.forEach((repo) => {
                    const repoElement = document.createElement('div');
                    repoElement.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available'}</p>
                    `;
                    userRepos.appendChild(repoElement);
                });
            });
            searchResults.appendChild(userElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});