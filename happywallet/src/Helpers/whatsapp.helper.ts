import axios from 'axios';

const url = "http://15.228.35.136:3000";
const routes = ["/send", "/status"];

export class Whatsapp {
    
    public static async sendAMessage(to:string, message:string): Promise<number> {
        const uri = url + routes[0];
        const body = {
            "number": to,
            "message": message    
        }
       const response = await axios.post(uri, body);
       return response.status;
    }
}