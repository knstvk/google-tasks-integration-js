/**
 * Created by krivopustov on 29.11.2014.
 */

/// <reference path="model.ts"/>

module taskks {

    declare var gapi;

    export class Service {

        private readyCallback: () => void;

        private tasklists: Array<Tasklist>;

        constructor() {
            var request = gapi.client.tasks.tasklists.list(/*{}*/);

            request.execute((resp) => {
                if (resp.error) {
                    console.log('Error: ' + resp.code + ' ' + resp.message);

                } else {
                    console.log('Success: ' + resp.result);

                    var result: Array<Tasklist> = [];
                    for (var i = 0; i < resp.result.items.length; i++) {
                        var obj = resp.result.items[i];
                        result.push(new Tasklist(obj.id, obj.title));
                    }

                    result.sort((a, b) => {
                        return a.title.localeCompare(b.title);
                    });
                    this.tasklists = result;

                    if (this.readyCallback)
                        this.readyCallback();
                }
            });
        }

        ready(callback: () => void) {
            this.readyCallback = callback;
        }

        getTasklists(): Array<Tasklist> {
            return this.tasklists;
        }

        getTasks(tasklistId: string, callback: (result: Array<Task>) => void): void {
            var request = gapi.client.tasks.tasks.list({tasklist: tasklistId});

            request.execute((resp) => {
                if (resp.error) {
                    console.log('Error: ' + resp.code + ' ' + resp.message);

                } else {
                    console.log('Success: ' + resp.result);

                    var result: Array<Task> = [];
                    for (var i = 0; i < resp.result.items.length; i++) {
                        var obj = resp.result.items[i];
                        result.push(new Task(obj.id, obj.title));
                    }

                    callback(result);
                }
            });
        }

    }
}
