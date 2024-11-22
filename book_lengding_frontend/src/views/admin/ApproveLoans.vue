<template>
  <div class="admin-borrow-requests">
    <h2>Borrow Requests Management</h2>

    <!-- Pending Requests Section -->
    <div class="request-section">
      <h3>Pending Requests</h3>
      <table v-if="pendingRequests.length > 0" class="borrow-requests-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>User ID</th>
            <th>Borrow Date</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in pendingRequests" :key="request._id">
            <td>{{ request.bookId.title }}</td>
            <td>{{ request.idStudent }}</td>
            <td>{{ formattedDate(request.borrowDate) }}</td>
            <td>{{ formattedDate(request.requestDate) }}</td>
            <td class="status-column status-pending">Pending</td>
            <td>
              <button class="btn btn-success" @click="approveRequest(request._id)">Approve</button>
              <button class="btn btn-danger" @click="rejectRequest(request._id)">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-requests">No pending requests.</p>
    </div>

    <!-- Approved Requests Section -->
    <div class="request-section">
      <h3>Approved Requests</h3>
      <table v-if="approvedRequests.length > 0" class="borrow-requests-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>User ID</th>
            <!-- <th>Borrow Date</th> -->
            <th>Due Date</th>
            <th>Approval Date</th>
            <th>Overdue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in approvedRequests" :key="request._id">
            <td>{{ request.bookId.title }}</td>
            <td>{{ request.idStudent }}</td>
            <!-- <td>{{ formattedDate(request.borrowDate) }}</td> -->
            <td>{{ formattedDate(request.dueDate) }}</td>
            <td>{{ formattedDate(request.approvalDate) }}</td>
            <td>
              <span :class="{ overdue: isOverdue(request.dueDate) }">
                {{ isOverdue(request.dueDate) ? 'Yes' : 'No' }}
              </span>
            </td>
            <td>
                <span v-if="request.status === 'returned'">
                  Returned on {{ formattedDate(request.returnedDate) }}
                  <span v-if="request.fine > 0" class="fine-amount">
                    (Fine: {{ request.fine }})
                  </span>
                </span>
                <button
                  v-else
                  class="btn btn-primary"
                  @click="returnBook(request._id)"
                >
                  Returned
                </button>
              </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-requests">No approved requests.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';

export default {
  name: 'AdminBorrowRequests',
  data() {
    return {
      pendingRequests: [],
      approvedRequests: [],
    };
  },
  methods: {
    async fetchPendingRequests() {
      try {
        const response = await apiClient.get('/books/borrowRequests/pending', {withCredentials: true});
        this.pendingRequests = response.data;
      } catch (error) {
        console.error('Failed to fetch pending borrow requests:', error);
      }
    },
    async fetchApprovedRequests() {
      try {
        const response = await apiClient.get('/books/borrowRequests/approved',{withCredentials: true} );
        this.approvedRequests = response.data;
      } catch (error) {
        console.error('Failed to fetch approved borrow requests:', error);
      }
    },
    async approveRequest(requestId) {
      try {
        await apiClient.post(`/books/borrowRequests/approve/${requestId}`, {withCredentials: true});
        alert('Request approved successfully');
        this.fetchPendingRequests();
        this.fetchApprovedRequests();
      } catch (error) {
        console.error('Failed to approve request:', error);
        alert('An error occurred while approving the request.');
      }
    },
    async rejectRequest(requestId) {
      try {
        await apiClient.post(`/books/borrowRequests/reject/${requestId}`,{withCredentials: true});
        alert('Request rejected successfully');
        this.fetchPendingRequests();
      } catch (error) {
        console.error('Failed to reject request:', error);
        alert('An error occurred while rejecting the request.');
      }
    },
      async returnBook(requestId) {
      try {
          const response = await apiClient.post(`/books/borrowRequests/return/${requestId}`,{withCredentials: true});
          alert('Book returned successfully');
          this.fetchApprovedRequests(); // Làm mới danh sách yêu cầu đã phê duyệt
        } catch (error) {
          console.error('Failed to return book:', error);
          alert('An error occurred while returning the book.');
        }
      },
      isOverdue(dueDate) {
        return new Date(dueDate) < new Date();
      },
    

    formattedDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    },
    isOverdue(dueDate) {
      return new Date(dueDate) < new Date();
    },
},

  mounted() {
    this.fetchPendingRequests();
    this.fetchApprovedRequests();
  }
}
</script>

<style scoped>
.admin-borrow-requests {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-weight: bold;
}

h3 {
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
}

.request-section {
  margin-bottom: 40px;
}

.borrow-requests-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.borrow-requests-table th,
.borrow-requests-table td {
  padding: 12px 15px;
  text-align: center;
  font-size: 14px;
}

.borrow-requests-table th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.borrow-requests-table tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.borrow-requests-table tr:hover {
  background-color: #f1f5f9;
}

.status-column {
  font-weight: bold;
}

.status-pending {
  color: #ffc107;
}

.status-approved {
  color: #28a745;
}

.overdue {
  color: red;
  font-weight: bold;
}

/* .overdue {
  color: red;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px; /
  background-color: #ffe6e6; 
  padding: 2px 6px; 
  border-radius: 4px; 
} */


.no-requests {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s ease;
  min-width: 80px;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger:hover {
  background-color: #c82333;
}
.fine-amount {
  color: red;
  font-weight: bold;
}

</style>
