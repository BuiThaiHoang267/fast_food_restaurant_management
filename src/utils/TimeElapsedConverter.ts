function formatElapsedTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
        // Render only the date if the elapsed time is more than a week
        return date.toLocaleDateString("vi-VN"); // Format date as dd/mm/yyyy for Vietnamese locale
    } else if (diffDays >= 1) {
        return `${diffDays} ngày trước`;
    } else if (diffSeconds >= 0) {
        // If the elapsed time is below a day, render full date-time
        return `Hôm nay ${date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    } else {
        return "Không hợp lệ";
    }
}

export default formatElapsedTime;