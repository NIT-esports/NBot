import axiosBase, { AxiosInstance, AxiosResponse } from "axios";
import { AccessPoint, DTO, Query } from ".";

class AccessToken implements Query {
    token: string = "";

    constructor(partial: Partial<AccessToken> = { token: "" }) {
        Object.assign(this, partial);
    }

    toObject(): object {
        return {
            access_token: this.token
        };
    }
}

export class Network {
    private static async getToken(): Promise<AccessToken> {
        const axios = axiosBase.create();
        const res = await axios.get<AccessToken>(process.env.OAUTH_API!);
        if (res.status != 200) {
            return new AccessToken();
        }
        return new AccessToken(res.data);
    }

    public static async get<Response extends DTO>(accessPoint: AccessPoint, parameters: Query | undefined = undefined): Promise<Response | null> {
        const token = await Network.getToken();
        const query = Object.assign({}, token.toObject(), parameters?.toObject());
        const axios: AxiosInstance = axiosBase.create();
        const res = await axios.get<Response>(process.env.MAIN_API! + "/" + accessPoint, {
            params: query,
        });
        if (res.status != 200) {
            return null;
        }
        console.log(res.data);
        return res.data;
    }

    public static async post<Request extends DTO, Response extends DTO>(accessPoint: AccessPoint, data: Request, parameters: Query | undefined = undefined): Promise<Response | null> {
        const token = await Network.getToken();
        const query = Object.assign({}, token.toObject(), parameters?.toObject());
        const axios = axiosBase.create({
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            responseType: "json",
        });
        const res: AxiosResponse<Response> = await axios.post<Request, Response>(process.env.MAIN_API! + "/" + accessPoint,
            data,
            {
                params: query,
            }).catch((error: any) => {
                return error.response;
            });
        if (res.status != 200) {
            return null;
        }
        return res.data;
    }
}