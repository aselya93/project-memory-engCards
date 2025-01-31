import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class TopicApi {
  static async getAllTopics() {
    try {
      const { data } = await axiosInstance.get("/topics");
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getTopicById(id) {
    try {
      const { data } = await axiosInstance.get(`/topics/${id}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
