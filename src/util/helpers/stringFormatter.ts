function getAvatarLetter(str: any) {
    try {
        // Split the string into words
        const words = str.split(" ");
        // If there's only one word, return the first two letters of the word
        if (words.length === 1) {
            return words[0].substring(0, 2);
        }

        // If there are multiple words, return the first letter of each word concatenated together
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    } catch (error) {
        return "-";
    }
}

const formatToFunction = (data: any) => {
    try {
        const number = data as number;
        return number.toFixed(2);
    } catch (error) {
        return "-";
    }
};

export { getAvatarLetter, formatToFunction };
