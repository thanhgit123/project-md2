import { notification } from "antd";
const success = (type) => {
    notification.success({
        message: type,
        style: {
          top: 200,
        },
        duration: 0.5
      });
}
const failed = (type) => {
    notification.error({
        message: type,
        style: {
          top: 200,
        },
        duration: 0.5 
      });
}
export { success, failed }