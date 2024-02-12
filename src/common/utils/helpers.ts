import * as crypto from 'crypto';

const algo = 'aes-256-cbc';

export const generateOtp = () => {
    return Math.random().toString().slice(2, 8);
};

export const convertTimeToMilliseconds = (time: number, measurement: 'hours' | 'minutes' | 'seconds') => {
    switch (measurement) {
        case 'hours':
            return time * 60 * 60 * 1000;
        case 'minutes':
            return time * 60 * 1000;
        case 'seconds':
            return time * 1000;
        default:
            return 0;
    }
};

export const maskEmail = (email: string) => {
    const arr = email.split(/@\w?/);

    const left = arr[0].slice(1);

    const right = arr[1].slice(0, -1);

    const maskLeft = Array.from({length: left.length}, () => '*').join('');

    const maskRight = Array.from({length: right.length}, () => '*').join('');

    const firstChar = email[0];

    const lastChar = email[email.length - 1];

    const centerSplitter = /@\w?/.exec(email)?.[0];

    return `${firstChar}${maskLeft}${centerSplitter}${maskRight}${lastChar}`;
};