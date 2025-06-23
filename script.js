// כתובת השרת שלך (localhost בזמן פיתוח או בשרת בענן לאחר העלאה)
const SCRIPT_URL = "https://nechsalim-proxy.onrender.com/api";


// פונקציה כללית לקריאות לשרת המתווך
async function apiCall(action, data = {}) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            // שנה את השורה הזו
            body: JSON.stringify({ apiKey: API_KEY, action, data }) 
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("API Call failed:", error);
        // נותן למשתמש פידבק טוב יותר
        if (error.message.includes('Failed to fetch')) {
             return { success: false, message: "שגיאת רשת. בדוק את חיבור האינטרנט." };
        }
        return { success: false, message: "אירעה שגיאה בלתי צפויה." };
    }
}

// פונקציות עזר קיימות
function setLoading(button, isLoading) {
    if (button) {
        button.disabled = isLoading;
        button.classList.toggle('loading', isLoading);
    }
}

function showMessage(divId, text, isError) {
    const div = document.getElementById(divId);
    if (div) {
        div.textContent = text;
        div.style.display = 'block';
        div.className = 'message ' + (isError ? 'error' : 'success');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
