import http from "../http-common";
class UrlShortnerService {

    shortenUrl(data: any) {
        return http.post("/url-shortener", data);
    }

}
export default new UrlShortnerService();