import http from "../http-common";
class UrlShortnerService {

    shorten(data: any) {
        return http.post("/url-shortner", data);
    }

}
export default new UrlShortnerService();