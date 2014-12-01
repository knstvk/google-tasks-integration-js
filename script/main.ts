/**
 * Created by krivopustov on 29.11.2014.
 */

/// <reference path="service.ts"/>
/// <reference path="tasklist_view.ts"/>

declare var gapi;

var clientId = '703434312299-577ql0ricg5ea2sqjf3e51dee6eeiglm.apps.googleusercontent.com';

var scopes = 'https://www.googleapis.com/auth/tasks';

function handleClientLoad() {
    gapi.client.setApiKey('AIzaSyCSFFms5sawinto0v70XwgGTkssKSGTIow');
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        load();
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

function load() {
    gapi.client.load('tasks', 'v1', gapiReady);
}

function gapiReady() {
    var service = new taskks.Service();
    service.ready(() => {
        var view = new taskks.TasklistView(service);
        view.render();
    });
}

