package com.pepedev.todobackend.filters

import com.pepedev.todobackend.entities.UserRepository
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.web.filter.OncePerRequestFilter

@Order(1)
@Configuration
class UserFilter(private val userRepository: UserRepository) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authorization = request.getHeader("Authorization") ?: return filterChain.doFilter(request, response)
        val userEmail = authorization.split("Bearer ")[1]
        println("********************$userEmail ***********************")
        val user = userRepository.findByEmail(userEmail)
        if(user != null){
            request.setAttribute("user",user)
        }
        filterChain.doFilter(request,response)
    }
}
