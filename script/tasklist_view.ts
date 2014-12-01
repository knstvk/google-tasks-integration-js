/**
 * Created by krivopustov on 01.12.2014.
 */

/// <reference path="../lib/jquery/jquery.d.ts" />
/// <reference path="service.ts"/>
/// <reference path="model.ts"/>
/// <reference path="task_view.ts"/>

module taskks {

    export class TasklistView {

        private service: Service;

        constructor(service: Service) {
            this.service = service;
        }

        render(): void {
            var tasklists = this.service.getTasklists();

            var listsSelect = <HTMLSelectElement> document.getElementById('list-select');
            for (var i = 0; i < tasklists.length; i++) {
                var option = document.createElement('option');
                option.text = tasklists[i].title;
                option.value = tasklists[i].id;
                listsSelect.appendChild(option);
            }
            this.showTasks(tasklists[0].id);

            listsSelect.onchange = () => {
                console.log('Selected: ' + listsSelect.value);
                this.showTasks(listsSelect.value);
            };
        }

        private showTasks(tasklistId: string): void {
            this.service.getTasks(tasklistId, (tasks: Array<taskks.Task>) => {
                var results = $('#results');
                results.html('');
                for (var i = 0; i < tasks.length; i++) {
                    var taskView = new TaskView(tasks[i]);
                    results.append(taskView.render());
                }
            });
        }
    }
}