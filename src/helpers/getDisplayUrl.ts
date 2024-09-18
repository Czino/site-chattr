export const getDisplayUrl = (urlString: string) => {
    const url = new URL(urlString)
    return url.toString().replace(`${url.protocol}//`, '')
}
