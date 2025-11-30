


export class CardSecurity {

    /**
     * Generates a valid 16-digit number that passes the Luhn check.
     */
    static generateValidNumber(prefix: string = '4000'): string {
        let num = prefix;
        while (num.length < 15) {
            num += Math.floor(Math.random() * 10).toString();
        }

        // Calculate check digit
        let sum = 0;
        let isEven = false;

        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return num + checkDigit;
    }

    /**
     * Formats a raw number string into groups of 4.
     */
    static format(num: string): string {
        return num.match(/.{1,4}/g)?.join(' ') || num;
    }
}
