import http from "../http-common";
class UrlShortnerService {

    shortenUrl(data: any) {
        return http.post("/", data);
    }

}
export default new UrlShortnerService();