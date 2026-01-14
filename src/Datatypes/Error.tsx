

export const ErrorEnum = {

    InvalidJwt: (err: unknown): any => ({
        statusCode: 400,
        message: `Invalid User JWT`,
        details: err
    }),
    InvalidJwtSecret: (): any => ({
        statusCode: 400,
        message: `Invalid JWT SECRET`,
        details: ""
    }),
    BotNotFound: (): any => ({
        statusCode: 400,
        message: `Bot Not Found JWT SECRET`,
        details: ""
    }),
};
