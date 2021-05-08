import service from "@/utils/request.js";

/*
* 列表
*/
export function TableList(params) {
    return service.request({
        url:params.url,
        method:params.method|| 'post',
        data:params.data
    })
}