/**
 * Created by krivopustov on 01.12.2014.
 */

/// <reference path="../lib/jquery/jquery.d.ts" />
/// <reference path="../lib/underscore/underscore.d.ts" />
/// <reference path="model.ts"/>

module taskks {

    export class TaskView {

        private task: Task;

        constructor(task: Task) {
            this.task = task;
        }

        render(): string {
            var template = $('#task-template').html();
            return _.template(template, this.task);
        }
    }
}