import apiClient from './client.js';

export const submitNewsletterSubscription = async (payload) => {
  return apiClient.request('/api/v1/notifications/newsletter', {
    method: 'POST',
    body: payload,
  });
};

export const submitCallbackRequest = async (payload) => {
  return apiClient.request('/api/v1/notifications/callback', {
    method: 'POST',
    body: payload,
  });
};

const notificationsApi = { submitNewsletterSubscription, submitCallbackRequest };
export default notificationsApi;
