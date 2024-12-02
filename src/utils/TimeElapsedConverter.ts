import dayjs from 'dayjs';

export function formatElapsedTime(date: Date): string {
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

export const timeConverter = (startDateStr: string, endDateStr: string): string => {
    const today = dayjs();
    const start = dayjs(startDateStr, 'DD/MM/YYYY');
    const end = dayjs(endDateStr, 'DD/MM/YYYY');

    // Check if both start and end are today
    if (start.isSame(today, 'day') && end.isSame(today, 'day')) {
        return "Hôm Nay";
    }

    // Check if both start and end are yesterday
    if (start.isSame(today.subtract(1, 'day'), 'day') && end.isSame(today.subtract(1, 'day'), 'day')) {
        return "Hôm Qua";
    }

    const daysDiff = today.diff(start, 'day');

    if (daysDiff <= 7) {
        return `${daysDiff} Ngày Qua`;
    }

    if (daysDiff <= 30) {
        return "30 Ngày Qua";
    }

    if (start.isSame(today, 'week')) {
        return "Tuần này";
    }

    if (start.isSame(today, 'month')) {
        return "Tháng này";
    }

    if (start.isSame(dayjs('01/01/1970', 'DD/MM/YYYY'), 'day')) {
        return "Toàn thời gian";
    }

    return startDateStr + " - " + endDateStr;
};