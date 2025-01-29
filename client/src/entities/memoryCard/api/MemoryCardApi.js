import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class MemoryCardApi {
  static async getMemoryCardsByTopic(topicId) {
    try {
      const { data } = await axiosInstance.get(`/cards/${topicId}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async createMemoryCard(topicId, cardData) {
    try {
      const { data } = await axiosInstance.post(`/cards/${topicId}`, cardData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateMarkAsLearnedMemoryCard(topicId, id) {
    try {
      const { data } = await axiosInstance.put(`/cards/${topicId}/${id}`, {
        isLearned: false,
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
