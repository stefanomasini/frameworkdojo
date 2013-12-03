define(['when'], function (when_) {
    'use strict';

    var NodesStorage = function (cfg) {
        this.serverMonitor = cfg.serverMonitor;
    };

    NodesStorage.prototype.getRootNodes = function () {
        return [
            {name: 'Folder 1', id: 1},
            {name: 'Folder 2', id: 2},
            {name: 'Folder 3', id: 3}
        ];
    };

    var allChildren = {
        1: [
            {name: 'Folder 4', id: 4, file: false},
            {name: 'Folder 5', id: 5, file: false},
            {name: 'Folder 6', id: 6, file: false}
        ],
        2: [
            {name: 'Folder 7', id: 7, file: false},
            {name: 'Folder 8', id: 8, file: false},
            {name: 'Folder 9', id: 9, file: false}
        ],
        9: [
            {name: 'File A', id: 10, file: true},
            {name: 'File B', id: 11, file: true}
        ]
    };

    NodesStorage.prototype.fetchChildrenNodes = function (node) {
        var deferred = when_.defer();
        this.serverMonitor.setBusy(true);
        var this_ = this;
        setTimeout(function () {
            this_.serverMonitor.setBusy(false);
            deferred.resolve(allChildren[node.id] || []);
        }, 300);
        return deferred.promise;
    };

    return {
        NodesStorage: NodesStorage
    }
});
