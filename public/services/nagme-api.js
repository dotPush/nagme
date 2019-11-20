const URL = '/api';

//const token = localStorage.getItem('TOKEN');
const user = JSON.parse(localStorage.getItem('USER')).token;
const token = user && user.token;
// redirect if not on home page
if (!token && !(location.pathname === '/' || location.pathname === '/index.html')) {

    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    //CHANGEME
    //location = `/?${searchParams.toString()}`;
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

// export const getNagLists = () => {
//     const url = `${URL}/lists`;
//     return fetchWithError(url);
// };

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

// export const addCategory = list => {
//     const url = `${URL}/lists`;
//     return fetchWithError(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(list)
//     });
// };

// export const updateNag = todo => {
//     const url = `${URL}/todos/${todo.id}`;
//     return fetchWithError(url, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(todo)
//     });
// };

// export const updateCategory = list => {
//     const url = `${URL}/lists/${list.id}`;
//     return fetchWithError(url, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(list)
//     });
// };

export const removeNag = nagId => {
    const url = `${URL}/nags/${nagId}`;
    return fetchWithError(url, {
        method: 'DELETE',
    });
};

// export const removeList = listId => {
//     const url = `${URL}/lists/${listId}`;
//     return fetchWithError(url, {
//         method: 'DELETE',
//     });
// };