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
        body: JSON.stringify({ action, data, token })
    });

    try {
        return await response.json();
    } catch (e) {
        return { success: false, message: "שגיאה בפענוח תשובת השרת." };
    }
}

// התחברות
async function login(email, password) {
    const res = await apiCall("verifyUser", { email, password });

    if (res.success) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("userName", res.name);
        localStorage.setItem("userRole", res.role); // ⬅ שמירת התפקיד

        if (res.role === "Admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "user.html";
        }
    } else {
        alert(res.message || "שגיאה בהתחברות");
    }
}

// יציאה מהמערכת
function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole"); // ⬅ ניקוי תפקיד
    window.location.href = "index.html";
}
