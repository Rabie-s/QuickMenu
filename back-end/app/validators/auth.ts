import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim(),
        email: vine.string().trim().normalizeEmail(),
        password: vine.string().trim().minLength(8),
        phoneNumber: vine.string().trim()
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().trim().normalizeEmail(),
        password: vine.string().trim().minLength(8),
    })
)