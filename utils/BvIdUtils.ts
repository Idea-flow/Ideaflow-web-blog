// utils/shareCodeUtils.ts

const BASE = [
    '3', 'Z', 'b', '8', 'F', 'p', 'D', 'X',
    'm', 'W', '7', 'k', 'J', 'H', 's', 'Q',
    'y',  'v', 'N', 'd', 'T', 'R', '6','S',
    'u', '9', 'i', 'c', 'B', '4', 'E', 'g',
    'L', '5', 'z', 'j', 'O', '2', 'P', 'h',
    'M', 'e', 'f', 't', '1', 'V', 'r', 'I',
    'x', 'n', 'q', 'w', 'C', 'K', 'G', 'Y',
    'l', 'U', 'o'
];

/**
 * A补位字符，不能与自定义重复
 */
const SUFFIX_CHAR = 'A';

/**
 * 进制长度
 */
const BIN_LEN = BASE.length;

/**
 * 生成邀请码最小长度
 */
const CODE_LEN = 8;

/**
 * ID转换为邀请码
 * @param id
 * @returns
 */
export const idToCode = (id: number): string => {
    let buf: string[] = new Array(BIN_LEN);
    let charPos = BIN_LEN;
    let num = id;

    // 当id除以数组长度结果大于0，则进行取模操作，并以取模的值作为数组的坐标获得对应的字符
    while (Math.floor(num / BIN_LEN) > 0) {
        const index = num % BIN_LEN;
        buf[--charPos] = BASE[index];
        num = Math.floor(num / BIN_LEN);
    }

    buf[--charPos] = BASE[num % BIN_LEN];
    // 将字符数组转化为字符串
    let result = buf.slice(charPos).join('');

    // 长度不足指定长度则随机补全
    const len = result.length;
    if (len < CODE_LEN) {
        const sb: string[] = [SUFFIX_CHAR];
        // 去除SUFFIX_CHAR本身占位之后需要补齐的位数
        for (let i = 0; i < CODE_LEN - len - 1; i++) {
            sb.push(BASE[Math.floor(Math.random() * BIN_LEN)]);
        }

        result += sb.join('');
    }

    return 'BV'+result;
};

/**
 * 邀请码解析出ID
 * @param code
 * @returns
 */
export const codeToId = (code: string): number => {
    code = code.split('BV')[1]; // 去除前缀 'BV'
    const charArray = code.split('');
    let result = 0;
    for (let i = 0; i < charArray.length; i++) {
        let index = 0;
        for (let j = 0; j < BIN_LEN; j++) {
            if (charArray[i] === BASE[j]) {
                index = j;
                break;
            }
        }

        if (charArray[i] === SUFFIX_CHAR) {
            break;
        }

        if (i > 0) {
            result = result * BIN_LEN + index;
        } else {
            result = index;
        }
    }

    return result;
};

// For testing
// console.log(idToCode(1));
// console.log(codeToId(idToCode(1)));