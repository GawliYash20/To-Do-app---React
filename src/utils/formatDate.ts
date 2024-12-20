const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Return a fallback message if invalid date
    }

    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const day = daysOfWeek[date.getDay()]; // Get the day of the week
    const dayOfMonth = String(date.getDate()).padStart(2, '0'); // Get the day of the month (02 if single digit)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (01 if January)
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day} ${dayOfMonth}-${month}-${year}`;
};

export default formatDate;
