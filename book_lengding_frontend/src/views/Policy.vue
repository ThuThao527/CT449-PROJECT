<template>
  <div class="policy-container">
   <h2>Library Book Borrowing Policy</h2> 
   <ul> 
    <li>Maximum borrowing time: 14 days.</li> 
    <li>Maximum number of books: 5 books at a time.</li> 
    <li>Penalty fee: 1,000 VND/day if returned late.</li> 
    <li>Extension: Can be extended for an additional 7 days if there are no further borrowers.</li> 
  </ul>
  </div>
</template>

<script>
export default {
  name: 'Policy',
};
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

li::before {
  content: '•';
  color: #007bff;
  margin-right: 8px;
}
</style>
