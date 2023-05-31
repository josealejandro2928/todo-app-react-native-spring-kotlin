package com.pepedev.todobackend.entities

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.*

@Entity
@Table(name = "todo")
class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    var id: Long? = null,
    var title: String,
    var description: String,
    var status: TodoStatus = TodoStatus.CREATED,

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: User,
    @CreationTimestamp()
    var createdAt: Date? = null,
    @UpdateTimestamp()
    var updatedAt: Date? = null
)

enum class TodoStatus {
    CREATED, ONPROGRESS, COMPLETED
}
