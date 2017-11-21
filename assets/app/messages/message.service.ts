import {Message} from "./message.model";
import {Headers, Http, Response, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx'
import {Observable} from "rxjs";

@Injectable()
export class MessageService {

    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage (message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 'Sam', result.obj._id, null);
                this.messages.push(message);
                return message;
        });
    }

    getMessage () {
        return this.http.get('http://localhost:3000/message')
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMsgs : Message[] = [];
                for (let message of messages) {
                    transformedMsgs.push(new Message(message.content, 'Sam', message._id, null));
                }
                this.messages = transformedMsgs;
                return transformedMsgs;
            });
    }

    editMessage (message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage (message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => response.json());
    }

    deleteMessage (message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/' + message.messageId)
            .catch((error: Response) => Observable.throw(error.json()))
            .map((response: Response) => response.json());
    }
}