const formatter = (response: any): string => (response && response.bpi.EUR.rate_float) || null;

export default formatter;
