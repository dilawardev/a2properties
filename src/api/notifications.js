import apiClient from './client.js';

export const submitNewsletterSubscription = async (payload) => {
  return apiClient.request('/api/v1/notifications/newsletter', {
    method: 'POST',
    body: payload,
  });
};

const notificationsApi = { submitNewsletterSubscription };
export default notificationsApi;
