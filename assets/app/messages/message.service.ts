import {Message} from "./message.model";
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";



@Injectable
export class MessageService {

    private messages: Message[] = [];

    constructor(private http: Http) {}

    addMessage (message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        // return this.http.post('http://localhost:3000/message', body)
        //     .map((response: Response) => response.json())
        //     .catch((err: Response) => Observable.throw(error.json()));
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => Observable.throw(error.json()))
    }

    getMessage () {
        return this.messages;
    }

    deleteMessage (message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}