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
