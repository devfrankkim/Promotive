const DATE = new Date();
const WEEK_DAY = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

export const TODAY_DATE = DATE.getMonth() + 1 + "/" + DATE.getDate();
export const DAY = WEEK_DAY[DATE.getDay()];
