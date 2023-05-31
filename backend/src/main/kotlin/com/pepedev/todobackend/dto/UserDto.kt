package com.pepedev.todobackend.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class CreateUserRequest(
    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Invalid email format")
    var email: String,
    @field:NotBlank(message = "First name is required")
    var firstName: String,
    @field:NotBlank(message = "Last name is required")
    var lastName: String,
)
data class UpdateUserRequest(
    @field:NotBlank(message = "First name is required")
    var firstName: String,
    @field:NotBlank(message = "Last name is required")
    var lastName: String,
)
