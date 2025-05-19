/**
 * Fetches user data from the API.
 * 
 * This function sends a GET request to the API endpoint to retrieve user details based on the provided userId.
 * It handles errors gracefully and returns the user's name, email, and last login time. In case of an error,
 * it logs the error to the console and returns `null`.
 *
 * @param {string} userId - The unique identifier of the user to fetch data for.
 * @returns {Promise<{name: string, email: string, lastLogin: Date}|null>} A promise that resolves to an object containing
 *          the user's name, email, and last login date. If there is an error, the promise resolves to `null`.
 * 
 * @throws {Error} Throws an error if the fetch request fails or if the API returns an error response (non-OK status).
 */
function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        // Handling specific HTTP error codes
        if (response.status === 404) {
          throw new Error('User not found');
        }
        if (response.status === 500) {
          throw new Error('Server error');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.name,
        email: data.email,
        lastLogin: new Date(data.lastLoginTimestamp)
      };
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return null;
    });
}
