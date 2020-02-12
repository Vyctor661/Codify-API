export default async (ctx: any, next: any) => {
    try {
        await next()
    } catch (e) {
        ctx.status = e.status || 500
        ctx.body = e.message
        ctx.app.emit("error", e, ctx)
    }
}
