angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("todolist.html","<h1>To Do List</h1>\n\n<form name=\"NewTodoForm\"\n      novalidate\n      class=\"input-form w100\"\n      ng-submit=\"NewTodoForm.$valid && todoPage.addTodo()\">\n  <div class=\"title-input-container\">\n    <input type=\"text\"\n           class=\"title-input w100\"\n           placeholder=\"Enter some title here...\"\n           ng-model=\"todoPage.newTodo.title\"\n           required>\n  </div>\n  <div class=\"description-input-container\">\n    <textarea class=\"description-area w100\"\n              ng-model=\"todoPage.newTodo.description\"\n              placeholder=\"Enter some description here...\"\n              required></textarea>\n  </div>\n  <div class=\"buttons-container\">\n    <button class=\"btn-add-todo\"\n            type=\"submit\"\n            ng-disabled=\"NewTodoForm.$invalid\">\n      Add!\n    </button>\n  </div>\n</form>\n<div class=\"todos-container\">\n  <form name=\"todoItemForm\"\n        novalidate\n        class=\"todo-item\"\n        ng-repeat=\"todo in todoPage.todoList track by $index\">\n\n    <i class=\"glyphicon glyphicon-remove remove-todo\"\n       ng-click=\"todoPage.removeTodo($index)\"></i>\n\n    <i class=\"glyphicon glyphicon-pencil edit-todo\"\n       ng-click=\"todoPage.editTodo($index)\"\n       ng-hide=\"todoPage.isEditingTodo[$index]\"></i>\n\n    <i class=\"glyphicon glyphicon-floppy-disk save-todo\"\n       ng-click=\"todoItemForm.$valid && todoPage.saveTodo($index)\"\n       ng-show=\"todoPage.isEditingTodo[$index]\"\n       ng-disabled=\"todoItemForm.$invalid\"></i>\n\n    <div ng-if=\"!todoPage.isEditingTodo[$index]\">\n      <h3 class=\"todo-title\">{{todo.title}}</h3>\n      <div class=\"todo-description\">{{todo.description}}</div>\n    </div>\n\n    <div ng-if=\"todoPage.isEditingTodo[$index]\">\n      <h3 class=\"todo-title\">\n        <input class=\"w100 edit-input\"\n               type=\"text\"\n               name=\"todoTitle\"\n               placeholder=\"Enter title here...\"\n               ng-model=\"todo.title\"\n               required />\n      </h3>\n      <div class=\"todo-description\">\n        <textarea class=\"w100 mw100 edit-description\"\n                  name=\"todoDescription\"\n                  placeholder=\"Enter description here...\"\n                  ng-model=\"todo.description\"\n                  required></textarea>\n      </div>\n    </div>\n\n  </form>\n</div>\n");}]);