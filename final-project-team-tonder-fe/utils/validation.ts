import * as Yup from "yup";

export const validation = Yup.object({
    name: Yup.string()
        .matches(/^([^0-9]*)$/, 'Trường này phải là chữ')
        .min(4, 'Trường này phải từ 4 ký tự trở lên')
        .max(15, 'Tên không được vượt quá 15 ký tự')
        .required('Yêu cầu nhập'),

    email: Yup.string().email('Không đúng định dạng email @gmail.com')
        .required('Yêu cầu nhập'),

})