const BASE_URL = "https://register.nomoreparties.co";

export const registerUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email, password),
        });
        const res = await response.json();
        return res;
    } catch (err) {
        return console.log(err);
    }
};

export const loginUser = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email, password),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                console.log(data);
                return data;
            } else {
                return;
            }
        })
        .catch((err) => console.log(err));
};

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then((res) => res.json())
        .then((data) => data);
};
