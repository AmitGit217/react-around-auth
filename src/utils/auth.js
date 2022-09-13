class Auth {
    constructor({ url, headers }) {
        this.baseUrl = url;
        this.headers = headers;
    }

    _customFetch(url, headers) {
        return fetch(url, headers).then((res) => {
            if (res) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    registerUser(email, password) {
        return this._customFetch(`${this.baseUrl}/signup`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(email, password),
        });
    }

    loginUser(email, password) {
        return this._customFetch(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email, password),
        });
    }

    checkToken(jwt) {
        return this._customFetch(`${this.baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });
    }
}

const auth = new Auth({
    url: "https://register.nomoreparties.co",
    headers: { "Content-Type": "application/json" },
});

export default auth;
