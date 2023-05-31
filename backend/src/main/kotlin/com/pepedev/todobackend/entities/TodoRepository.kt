package com.pepedev.todobackend.entities;

import org.springframework.data.jpa.repository.JpaRepository

interface TodoRepository : JpaRepository<Todo, Long> {
    fun findAllByUserOrderByCreatedAtDesc(user: User): List<Todo>
    fun findAllOrderByOrderByCreatedAtDesc(): List<Todo>
}
