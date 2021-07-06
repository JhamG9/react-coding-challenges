import config from "../config";

/**
 * Method return access_token of storage
 * @returns string access_token in storage
 */
export const getToken = () => {
    return localStorage.getItem(config.storageKeys.accessToken);
};

/**
 * Method return code of storage
 * @returns string getCode
 */
export const getCode = () =>{
    return localStorage.getItem(config.storageKeys.code);
}