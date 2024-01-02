export const ROUTES = [
    "home",
    "blog/list",
    "blog/post",
    "blog/{articleId}",
    "blog/{articleId}/edit",
    "contact/location",
    "contact/form",
    "blog/{articleId}?language={language}&anchor={anchor}"
] as const;