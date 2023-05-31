package com.pepedev.todobackend.configuration

import jakarta.persistence.EntityManager
import org.hibernate.Hibernate
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.datasource.DriverManagerDataSource
import javax.sql.DataSource

@Configuration
class DatabaseConfiguration() {
    @Value("\${MAIN_DB.url}")
    val url: String = ""

    @Value("\${MAIN_DB.username}")
    val username: String = ""

    @Value("\${MAIN_DB.password}")
    val password: String = ""

    @Bean(name = ["mainDataBase"])
    fun mainDataBase(): DataSource {
        val mainDataBase = DriverManagerDataSource()
        mainDataBase.setDriverClassName("org.postgresql.Driver")
        mainDataBase.url = this.url
        mainDataBase.username = this.username
        mainDataBase.password = this.password
        return mainDataBase
    }

}
