import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

interface IShowError {
    text: string,
    messageApi: MessageInstance,
    contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export const ShowError = ({ text, messageApi, contextHolder }: IShowError) => {

    messageApi.open({
        type: 'error',
        content: `${text}`,
    });

    return (
        { contextHolder }
    )
}