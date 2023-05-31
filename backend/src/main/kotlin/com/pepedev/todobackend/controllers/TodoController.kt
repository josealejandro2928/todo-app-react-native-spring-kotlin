package com.pepedev.todobackend.controllers;


import com.pepedev.todobackend.dto.CreateTodoRequest
import com.pepedev.todobackend.dto.UpdateTodoRequest
import com.pepedev.todobackend.entities.Todo
import com.pepedev.todobackend.entities.TodoStatus
import com.pepedev.todobackend.entities.User
import com.pepedev.todobackend.services.TodoService
import jakarta.validation.Valid
import jakarta.websocket.server.PathParam
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpClientErrorException

@RestController
@RequestMapping("v1/todo")
class TodoController(private val todoService: TodoService) {
    @PostMapping()
    fun createTodo(
        @RequestBody @Valid createTodoRequest: CreateTodoRequest,
        @RequestAttribute("user") loggedInUser: User?
    ): ResponseEntity<Todo> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        return ResponseEntity(todoService.createTodo(loggedInUser, createTodoRequest), HttpStatus.CREATED)
    }

    @GetMapping()
    fun getAllTodo(
        @RequestAttribute("user") loggedInUser: User?
    ): ResponseEntity<List<Todo>> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        return ResponseEntity(todoService.findAll(loggedInUser), HttpStatus.OK)
    }

    @GetMapping("/{todoId}")
    fun getTodo(
        @RequestAttribute("user") loggedInUser: User?,
        @PathVariable todoId: Long
    ): ResponseEntity<Todo> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        return ResponseEntity(todoService.find(todoId, loggedInUser), HttpStatus.OK)
    }

    @GetMapping("/{todoId}/status")
    fun changeStatus(
        @RequestAttribute("user") loggedInUser: User?,
        @PathVariable todoId: Long,
        @PathParam("status") status: TodoStatus
    ): ResponseEntity<Todo> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        return ResponseEntity(todoService.changeStatus(todoId, status, loggedInUser), HttpStatus.OK)
    }

    @PutMapping("/{todoId}")
    fun update(
        @RequestAttribute("user") loggedInUser: User?,
        @PathVariable todoId: Long,
        @RequestBody @Valid updateRequest: UpdateTodoRequest
    ): ResponseEntity<Todo> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        return ResponseEntity(todoService.update(todoId, updateRequest, loggedInUser), HttpStatus.OK)
    }

    @DeleteMapping("/{todoId}")
    fun delete(
        @RequestAttribute("user") loggedInUser: User?,
        @PathVariable todoId: Long,
    ): ResponseEntity<Any> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        todoService.remove(todoId, loggedInUser)
        return ResponseEntity.status(204).body(null)
    }
}
