export const PRODUCT_API = {
    GET_ALL_PRODUCT: '/product/all',
    GET_PRODUCT_BY_TYPE_PRODUCT: '/product/type-product',
    CREATE_PRODUCT: '/product/create',
    GET_PRODUCT_BY_FILTER: '/product',
    GET_PRODUCT_BY_CATEGORY_ID: '/product/category',
    DELETE_PRODUCT_BY_ID:(id: number) => `/product/soft-delete/${id}`,
}

export const CATEGORY_API = {
    GET_ALL_CATEGORY: '/category/all',
}

export const USER_API = {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    GET_USER_BY_ID: (id: number) => `/user/${id}`,
    GET_USER_BY_FILTER: '/user',
    UPDATE_USER: (id: number) => `/user/update/${id}`,
    DELETE_USER: (id: number) => `/user/${id}`,
}

export const ORDER_API = {
    CREATE_ORDER: '/order/create',
    GET_ORDER_BY_FILTERS: '/order',
    GET_ORDER_STATUS_PENDING:(branchId: string) => `/order/status-pending/${branchId}`,
    GET_ORDER_ITEM_BY_STATUS_COOKED:(branchId: string)=> `/order/item/status-cooked/${branchId}`,

    UPDATE_ORDER_ITEM:(id: number) => `/order/item/update/${id}`,
    UPDATE_ORDER:(id: number) => `/order/update/${id}`,
    DELETE_ORDER:(id: number) => `/order/delete/${id}`,
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
    GET_TOP_PRODUCT: '/statistic/top-product',
    GET_STATISTICAL_REPORT_SALE: '/statistical-report/sale',
    GET_STATISTICAL_REPORT_PRODUCT: '/statistical-report/product',
}

export const ROLE_API = {
    GET_ALL_ROLE: '/role/all',
}

export const AUDIT_LOG_API = {
    GET_AUDIT_LOG_RECENT: '/audit-log/recent',
}