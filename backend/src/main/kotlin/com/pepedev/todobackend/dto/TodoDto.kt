package com.pepedev.todobackend.dto

import com.pepedev.todobackend.entities.TodoStatus
import jakarta.validation.constraints.NotBlank

data class CreateTodoRequest(
    @field:NotBlank()
    var title: String,
    @field:NotBlank()
    var description: String
)

data class UpdateTodoRequest(
    var title: String?,
    var description: String?,
    var status: TodoStatus?
)
