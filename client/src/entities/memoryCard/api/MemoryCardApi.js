import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class MemoryCardApi {
  static async getMemoryCardsByTopic(topicId) {
    try {
      const { data } = await axiosInstance.get(`/${topicId}/cards/`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async createMemoryCard(topicId, cardData) {
    try {
      const { data } = await axiosInstance.get(`/${topicId}/cards/`,  cardData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateMarkAsLearnedMemoryCard(topicId, id) {
    try {
      const { data } = await axiosInstance.put(`/${topicId}/cards/${id}`, { isLearned: false });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
