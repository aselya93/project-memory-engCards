import { axiosInstance } from "../../../shared/lib/axiosInstance";

export default class MemoryCardApi {
  static async getMemoryCardsByTopic(topicId, isLearned) {
    try {
      const { data } = await axiosInstance.get(`/cards/${topicId}`, {
        params: { isLearned: isLearned },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async createMemoryCard(topicId, cardData) {
    try {
      const response = await axiosInstance.post(`/cards/${topicId}`, {
        ...cardData,
        topicId,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateMarkAsLearnedMemoryCard(id) {
    try {
      const { data } = await axiosInstance.put(`/cards/${id}`, {
        isLearned: true,
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
