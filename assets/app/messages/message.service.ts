import {Message} from "./message.model";
import {Headers, Http, Response, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx'
import {Observable} from "rxjs";

@Injectable()
export class MessageService {

    private messages: Message[] = [];

    constructor(private http: Http) {}

    addMessage (message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => response.json());
    }

    getMessage () {
        return this.http.get('http://localhost:3000/message')
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMsgs : Message[] = [];
                for (let message of messages) {
                    transformedMsgs.push(new Message(message.content, 'Sam', message.id, null));
                }
                this.messages = transformedMsgs;
                return transformedMsgs;
            });
    }

    deleteMessage (message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}