async function fetchUserData() {
    const username = document.getElementById('search-input').value;
    const errorElement = document.getElementById('error-msg');
    const userDetails = document.getElementById('user-details');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    errorElement.textContent = '';
    userDetails.style.display = 'none';
    loadingSpinner.style.display = 'flex';

    if (!username) {
        errorElement.textContent = 'Please enter a username.';
        loadingSpinner.style.display = 'none';
        return;
    }
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found.');
        }

        const data = await response.json();

        document.getElementById('profile-img').src = data.avatar_url;
        document.getElementById('user-fullname').textContent = data.name || 'No name provided';
        document.getElementById('user-login-name').textContent = `@${data.login}`;
        document.getElementById('user-bio-info').textContent = data.bio || 'No bio available';
       
        document.getElementById('repo-count').textContent = data.public_repos;
        document.getElementById('follower-count').textContent = data.followers;
        document.getElementById('following-count').textContent = data.following;

        document.getElementById('user-location').textContent = data.location || 'Location not provided';
        document.getElementById('user-company').textContent = data.company || 'Company not provided';
        document.getElementById('user-website').textContent = data.blog ? `Website: ${data.blog}` : 'No website available';

        document.getElementById('user-joined').textContent = `Joined: ${new Date(data.created_at).toLocaleDateString()}`;

        userDetails.style.display = 'block';
        loadingSpinner.style.display = 'none'; 
    } catch (error) {
        errorElement.textContent = error.message;
        loadingSpinner.style.display = 'none'; 
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        fetchUserData();
    }
}
