import vine from '@vinejs/vine'

export const createMenuValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        cover_image: vine.file({extnames:['jpg', 'png','jpeg']}),
        is_available: vine.boolean()
    })
)

export const updateMenuValidator = vine.compile(
    vine.object({
        name: vine.string().trim(),
        cover_image: vine.file({extnames:['jpg', 'png','jpeg']}).optional(),
        is_available: vine.boolean()
    })
)
