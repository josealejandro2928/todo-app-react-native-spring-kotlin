package com.pepedev.todobackend.commons

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.validation.BindException
import org.springframework.validation.BindingResult
import org.springframework.validation.ObjectError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

data class ErrorResponse(
    val code: Int,
    val message: String,
    val errors: List<String?>
)

@RestControllerAdvice
class GlobalExceptionHandler {
    private val logger: Logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        val allErrors: MutableList<ObjectError> = ex.allErrors
        val errors = allErrors.map { "${it.defaultMessage}" }
        val response = ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), "Validation Failed", errors)
        logger.error("Validation Failed: {}", errors)
        return ResponseEntity(response, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    @ExceptionHandler(BindException::class)
    fun handleBindExceptions(ex: BindException): ResponseEntity<ErrorResponse> {
        val bindingResult: BindingResult = ex.bindingResult
        val errors = bindingResult.allErrors.map { it.defaultMessage }
        val response = ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Validation Failed", errors)
        logger.error("Validation Failed: {}", errors)
        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleBindExceptions(ex: MethodArgumentTypeMismatchException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.message.toString(), listOf())
        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(HttpClientErrorException::class)
    fun handleBindExceptions(ex: HttpClientErrorException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(ex.statusCode.value(), ex.message ?: "Invalid request", listOf())
        logger.error("Invalid request: {}", response)
        return ResponseEntity(response, ex.statusCode)
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleBindExceptions(ex: HttpMessageNotReadableException): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), "Invalid request schema", listOf())
        logger.error("Invalid request: {}", response)
        return ResponseEntity(response, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal Server Error, contact the team",
            emptyList()
        )
        logger.error("Internal Server Error", ex)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response)
    }
}
