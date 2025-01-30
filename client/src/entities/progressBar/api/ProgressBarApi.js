// import { axiosInstance } from "../../../shared/lib/axiosInstance";

// export default class ProgressBarApi {
//   static async getProgress(topicId) {
//     try {
//       const { data } = await axiosInstance.get(`/progress/`, {topicId });
//       return data;
//     } catch (error) {
//       return error.response.data;
//     }
//   }

//   static async updateProgress(topicId) {
//     try {
//       const { data } = await axiosInstance.put(`/progress`, { topicId });
//       return data;
//     } catch (error) {
//       return error.response.data;
//     }
//   }
// }
