package com.pepedev.todobackend.controllers

import com.pepedev.todobackend.dto.CreateUserRequest
import com.pepedev.todobackend.dto.UpdateUserRequest
import com.pepedev.todobackend.entities.User
import com.pepedev.todobackend.services.UserService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpClientErrorException


@RequestMapping("v1/users")
@RestController
class UserController(private val userService: UserService) {
    @PostMapping
    fun createUser(@RequestBody @Valid createUserRequest: CreateUserRequest): ResponseEntity<User> {
        val user = userService.createUser(createUserRequest)
        return ResponseEntity(user, HttpStatus.CREATED)
    }

    @PutMapping
    fun updateUser(
        @RequestAttribute(name = "user") loggedInUser: User?,
        @RequestBody @Valid updateUserRequest: UpdateUserRequest
    ): ResponseEntity<User> {
        if (loggedInUser == null) throw HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Token is required")
        val user = userService.updateUser(loggedInUser, updateUserRequest)
        return ResponseEntity(user, HttpStatus.OK)
    }

}
