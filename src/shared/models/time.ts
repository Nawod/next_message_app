/**
 * @class Time
 * @description purpose of this function is to format given date
 * @author Nawod Madhuvantha
*/

export class Time {
    public static timeAgo(date: Date): string {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
        const interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
    
        const intervalMonths = seconds / 2592000;
        if (intervalMonths > 1) {
            return Math.floor(intervalMonths) + " months ago";
        }
    
        const intervalDays = seconds / 86400;
        if (intervalDays > 1) {
            return Math.floor(intervalDays) + " days ago";
        }
    
        const intervalHours = seconds / 3600;
        if (intervalHours > 1) {
            return Math.floor(intervalHours) + " hours ago";
        }
    
        const intervalMinutes = seconds / 60;
        if (intervalMinutes > 1) {
            return Math.floor(intervalMinutes) + " minutes ago";
        }
    
        return Math.floor(seconds) + " seconds ago";
    }
}