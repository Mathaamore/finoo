export function getWeekRange(inputDate) {
    /**
     * Calculates the start and end dates of a week based on the given input date.
     * @param {string | number | Date} inputDate - The input date.
     * @returns {Array<Date>} An array containing the start and end dates of the week.
     * @example
     * const inputDate = new Date();
     * const [weekStartDate, weekEndDate] = getWeekRange(inputDate);
     */
    if (!inputDate) return null;

    const input = new Date(inputDate);
    const day = input.getDay();
    const diff = input.getDate() - day + (day == 0 ? -6 : 1); // Adjust for Sunday as the first day of the week

    const weekStartDate = new Date(input);
    weekStartDate.setDate(diff);
    weekStartDate.setHours(0, 0, 0, 0);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    weekEndDate.setHours(0, 0, 0, 0);

    return [weekStartDate, weekEndDate];
}


function getWeekNumber(date) {
    // Copy date so don't modify original
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNumber = Math.ceil((((date - +yearStart) / 86400000) + 1) / 7);
    return weekNumber;
}

export function formatDate(inputDate, type) {
    if (!inputDate) return;

    const day = inputDate.getDate();
    const week = getWeekNumber(inputDate);
    const month = inputDate.getMonth() + 1; // Month is 0-indexed
    const year = inputDate.getFullYear();

    if (type === "Daily") {
        return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    } else if (type === "Weekly") {
        return `w${week.toString().padStart(2, "0")}/${year}`;
    } else if (type === "Monthly") {
        return `${month.toString().padStart(2, "0")}/${year}`;
    } else if (type === "Yearly") {
        return year.toString();
    } else {
        return "Invalid type";
    }
}