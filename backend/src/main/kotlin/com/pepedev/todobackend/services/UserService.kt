package com.pepedev.todobackend.services

import com.pepedev.todobackend.dto.CreateUserRequest
import com.pepedev.todobackend.dto.UpdateUserRequest
import com.pepedev.todobackend.entities.User
import com.pepedev.todobackend.entities.UserRepository
import com.pepedev.todobackend.utils.assignAttributes
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.HttpClientErrorException

@Service
class UserService(private val userRepository: UserRepository) {
    @Transactional
    fun createUser(createUserRequest: CreateUserRequest): User {
        var user = userRepository.findByEmail(createUserRequest.email)
        if (user != null) throw HttpClientErrorException(HttpStatus.BAD_REQUEST, "The requested email is present")
        user = User(
            email = createUserRequest.email,
            firstName = createUserRequest.firstName,
            lastName = createUserRequest.lastName
        )
        user = userRepository.save(user)
        return user;
    }

    @Transactional
    fun updateUser(user: User, updateUserRequest: UpdateUserRequest): User {
        var newUser = assignAttributes(user,updateUserRequest)
        newUser = this.userRepository.save(newUser)
        return newUser;
    }
}
