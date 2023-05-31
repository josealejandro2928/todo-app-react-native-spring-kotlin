package com.pepedev.todobackend.services;

import com.pepedev.todobackend.dto.CreateTodoRequest
import com.pepedev.todobackend.dto.UpdateTodoRequest
import com.pepedev.todobackend.entities.*
import com.pepedev.todobackend.utils.assignAttributes
import jakarta.persistence.EntityManager
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.HttpClientErrorException

@Service
class TodoService(
    private val todoRepository: TodoRepository,
    private val entityManager: EntityManager
) {
    @Transactional
    fun createTodo(user: User, createTodoRequest: CreateTodoRequest): Todo {
        var todo = Todo(
            title = createTodoRequest.title,
            description = createTodoRequest.description,
            user = entityManager.getReference(User::class.java, user.id)
        )
        todo = todoRepository.save(todo)
        return todo
    }

    @Transactional
    fun changeStatus(todoId: Long, status: TodoStatus, user: User): Todo {
        val todo = this.find(todoId, user)
        todo.status = status
        return todoRepository.save(todo)
    }

    @Transactional
    fun update(todoId:Long, updatableParams: UpdateTodoRequest, user: User): Todo {
        val todo = this.find(todoId, user)
        val newTodo = assignAttributes(
            todo,
            updatableParams,
            allowNull = false,
            avoidAttributes = listOf("createdAt", "id", "updatedAt", "user")
        )
        return todoRepository.save(newTodo)
    }

    fun find(todoId: Long, user: User): Todo {
        val todo = todoRepository.findById(todoId)
            .orElseThrow { HttpClientErrorException(HttpStatus.NOT_FOUND, "Not found such Todo") }
        if (todo.user.id != user.id && user.role != UserRoles.ADMIN) throw HttpClientErrorException(
            HttpStatus.FORBIDDEN,
            "You can access to this resource"
        )
        return todo
    }

    @Transactional
    fun remove(todoId: Long, user: User) {
        val todo = this.find(todoId, user)
        this.todoRepository.delete(todo)
    }

    fun findAll(user: User): List<Todo> {
        return if (user.role.name == "USER") {
            this.todoRepository.findAllByUserOrderByCreatedAtDesc(user)
        } else {
            this.todoRepository.findAllOrderByOrderByCreatedAtDesc()
        }
    }
}
