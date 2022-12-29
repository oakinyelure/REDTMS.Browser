import { environment } from 'src/environments/environment';

export class ApiRoute {
    /**
     * Generates server url using environment variable for the server url and the url path argument
     * @param path The URL path
     * @returns {string} Combined URL and path
     */
    static fromServerUrl(path: string): string {
        const baseUrl = path.startsWith('/') ? environment.serviceUrl : `${environment.serviceUrl}/`;
        return `${baseUrl}${path}`;
    }
}
