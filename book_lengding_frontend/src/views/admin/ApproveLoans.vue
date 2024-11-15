<template>
  <div>
    <h2>Borrow Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Book Title</th>
          <th>User ID</th>
          <th>Borrow Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in borrowRequests" :key="request._id">
          <td>{{ request.bookId.title }}</td>
          <td>{{ request.userId }}</td>
          <td>{{ request.borrowDate }}</td>
          <td>{{ request.status }}</td>
          <td>
            <button @click="approveRequest(request._id)">Approve</button>
            <button @click="rejectRequest(request._id)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiClient from '@/axios';

export default {
  data() {
    return {
      borrowRequests: [],
    };
  },
  methods: {
    async fetchBorrowRequests() {
      try {
        const response = await apiClient.get('/admin/borrow-requests');
        this.borrowRequests = response.data;
      } catch (error) {
        console.error('Failed to fetch borrow requests:', error);
      }
    },
    async approveRequest(requestId) {
      try {
        await apiClient.post(`/admin/borrow-requests/approve/${requestId}`);
        alert('Request approved successfully');
        this.fetchBorrowRequests(); // Tải lại danh sách yêu cầu
      } catch (error) {
        console.error('Failed to approve request:', error);
      }
    },
    async rejectRequest(requestId) {
      try {
        await apiClient.post(`/admin/borrow-requests/reject/${requestId}`);
        alert('Request rejected successfully');
        this.fetchBorrowRequests();
      } catch (error) {
        console.error('Failed to reject request:', error);
      }
    },
  },
  mounted() {
    this.fetchBorrowRequests();
  },
};
</script>
