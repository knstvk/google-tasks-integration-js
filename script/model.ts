/**
 * Created by krivopustov on 29.11.2014.
 */

module taskks {

    export class Tasklist {

        id: string;
        title: string;

        constructor(id: string, title: string) {
            this.id = id;
            this.title = title;
        }
    }

    export class Task {

        id: string;
        title: string;

        constructor(id: string, title: string) {
            this.id = id;
            this.title = title;
        }
    }
}