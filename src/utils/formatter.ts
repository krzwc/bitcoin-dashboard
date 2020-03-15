const formatter = (response: any): [string, number] =>
    response ? [response.time.updatedISO, response.bpi.EUR.rate_float] : [null, null];

export default formatter;
