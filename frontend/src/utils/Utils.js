const Utils = {
    uniqueID: () => {
        return Math.floor(1000 + Math.random() * 9999).toString();
    },
    getCurrentFormattedTime: () => {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

}

export default Utils