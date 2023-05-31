package com.pepedev.todobackend.utils

inline fun <reified T, reified K> assignAttributes(
    destination: T,
    source: K,
    allowNull: Boolean = true,
    avoidAttributes: List<String> = listOf()
): T {
    val sourceProperties = K::class.java.declaredFields
    val destinationProperties = T::class.java.declaredFields

    for (sourceProperty in sourceProperties) {
        val sourcePropertyName = sourceProperty.name
        val destinationProperty = destinationProperties.find { it.name == sourcePropertyName }

        if (destinationProperty != null) {
            if (destinationProperty.type == sourceProperty.type) {
                sourceProperty.isAccessible = true
                destinationProperty.isAccessible = true
                if (allowNull || (!allowNull && sourceProperty.get(source) != null))
                    if (sourceProperty.name !in avoidAttributes)
                        destinationProperty.set(destination, sourceProperty.get(source))
            }
        }
    }
    return destination
}
