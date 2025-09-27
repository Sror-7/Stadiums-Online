export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export function getObjectDiffPatch(original, updated) {
  if (!original || !updated) return [];

  return Object.keys(updated).reduce((patchOps, key) => {
    if (original[key] !== updated[key]) {
      patchOps.push({
        op: "replace",
        path: `/${key}`,
        value: updated[key],
      });
    }
    return patchOps;
  }, []);
}

export function formatTime(timeStr) {
  if (
    timeStr.toUpperCase().includes("AM") ||
    timeStr.toUpperCase().includes("PM")
  ) {
    return timeStr;
  }
  const date = new Date(`1970-01-01T${timeStr}`);
  return date
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}
export function getUserToken() {
  console.log("U T Rendered");
  let token = sessionStorage.getItem("stadiumsApp.accessToken");

  if (token == null) {
    token = localStorage.getItem("stadiumsApp.accessToken");

    if (token != null) {
      sessionStorage.setItem("stadiumsApp.accessToken", token);
    }
  }

  return token;
}
