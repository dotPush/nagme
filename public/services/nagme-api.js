const URL = '/api';

//const token = localStorage.getItem('TOKEN');
const user = JSON.parse(localStorage.getItem('USER'));
const token = user && user.token;

// redirect to home page if not logged in and not on home page
if (!token && !(location.pathname === '/' || location.pathname === '/index.html')) {
    location = `/`;
}

// redirect to list if logged in
if (token && (location.pathname === '/' || location.pathname === '/index.html')) {
    location = `/list.html`;
}

const fetchWithError = async(url, options) => {
    if (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
};

export const signUp = user => {
    const url = `${URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)        
    });
};

export const signIn = credentials => {
    const url = `${URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)        
    });
};

export const getNags = () => {
    const url = `${URL}/nags`;
    return fetchWithError(url);
};

export const getNagById = (id) => {
    const url = `${URL}/nags/${id}`;
    return fetchWithError(url);
};

export const addNag = nag => {
    console.log('addNag', nag);
    const url = `${URL}/nags`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nag)
    });
};

export const removeNag = nagId => {
    const url = `${URL}/nags/${nagId}`;
    return fetchWithError(url, {
        method: 'DELETE',
    });
};
