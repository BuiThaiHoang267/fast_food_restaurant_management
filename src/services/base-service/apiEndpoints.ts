export const PRODUCT_API = {
    GET_ALL_PRODUCT: '/product/all',
    GET_PRODUCT_BY_TYPE_PRODUCT: '/product/type-product',
    CREATE_PRODUCT: '/product/create',
    GET_PRODUCT_BY_FILTER: '/product',
    GET_PRODUCT_BY_CATEGORY_ID: '/product/category',
}

export const CATEGORY_API = {
    GET_ALL_CATEGORY: '/category/all',
}

export const USER_API = {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
}

export const ORDER_API = {
    CREATE_ORDER: '/order/create',
    GET_ORDER_BY_FILTERS: '/order',
    GET_ORDER_STATUS_PENDING: '/order/status-pending',
    GET_ORDER_ITEM_BY_STATUS_COOKED: '/order/item/status-cooked',

    UPDATE_ORDER_ITEM:(id: number) => `/order/item/update/${id}`,
    UPDATE_ORDER:(id: number) => `/order/update/${id}`,
}

export const PAYMENT_METHOD_API = {
    GET_ALL_PAYMENT_METHOD: '/payment-method/all',
}

export const BRANCH_API = {
    GET_ALL_BRANCH: '/branch/all',
}

export const STATISTIC_API = {
    GET_STATISTIC_RESULT_TODAY: '/statistic/result-today',
    GET_REVENUE_CHART: '/statistic/revenue-chart',
}
