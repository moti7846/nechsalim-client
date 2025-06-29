const SCRIPT_URL = "https://nechsalim-proxy.onrender.com/api";

// קריאה לשרת עם הטוקן
async function apiCall(action, data = {}) {
    const token = localStorage.getItem("authToken");
    const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ action, data, token }) // שולחים גם בגוף וגם בכותרת
    });

    try {
        return await response.json();
    } catch (e) {
        return { success: false, message: "שגיאה בפענוח תשובת השרת." };
    }
}

async function login(email, password) {
    const res = await apiCall("verifyUser", { email, password });
    if (res.success) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("userName", res.name);
        window.location.href = "admin.html";
    } else {
        alert(res.message || "שגיאה בהתחברות");
    }
}

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}
