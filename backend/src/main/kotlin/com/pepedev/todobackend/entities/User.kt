package com.pepedev.todobackend.entities

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.*

@Entity
@Table(name = "\"user\"")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    var id: Long? = null,
    @Column(nullable = false, unique = true)
    var email: String,
    var firstName: String,
    var lastName: String,
    var role: UserRoles = UserRoles.USER,
    @CreationTimestamp()
    var createdAt: Date? = null,
    @UpdateTimestamp()
    var updatedAt: Date? = null
)

enum class UserRoles {
    USER, ADMIN
}
