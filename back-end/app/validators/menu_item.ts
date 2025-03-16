import vine from '@vinejs/vine'

export const createMenuItemValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        price:vine.number(),
        description:vine.string().trim(),
        image:vine.file(),
        is_available:vine.boolean(),
    })
)

export const updateMenuItemValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        price:vine.number(),
        description:vine.string().trim(),
        image:vine.file().optional(),
        is_available:vine.boolean(),
    })
)