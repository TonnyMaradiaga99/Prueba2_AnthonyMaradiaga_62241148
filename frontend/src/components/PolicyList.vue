<template>
  <div class="policy-container">
    <h1 class="policy-title">Lista de Pólizas</h1>
    <table class="policy-table">
      <thead>
        <tr>
          <th>Número de Póliza</th>
          <th>Tipo de Seguro</th>
          <th>Titular</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poliza in policies" :key="poliza._id">
          <td>{{ poliza.numeroPoliza }}</td>
          <td>{{ poliza.tipoSeguro }}</td>
          <td>{{ poliza.titular }}</td>
          <td>{{ poliza.monto }}</td>
          <td>
            <button @click="editPolicy(poliza._id)" class="edit-btn">Editar</button>
            <button @click="deletePolicy(poliza._id)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    policies: {
      type: Array,
      required: true
    }
  },
  emits: ['policy-updated', 'edit-policy'],
  setup(props, { emit }) {
    const editPolicy = (id) => {
      const policy = props.policies.find(p => p._id === id);
      emit('edit-policy', policy);
    };

    const removePolicy = async (id) => {
      try {
        await import('../api/policies').then(api => api.deletePolicy(id));
        emit('policy-updated');
      } catch (error) {
        console.error('Error deleting policy:', error);
      }
    };

    return {
      editPolicy,
      deletePolicy: removePolicy,
    };
  },
};
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.policy-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
}
.policy-table {
  width: 100%;
  border-collapse: collapse;
}
.policy-table th, .policy-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
.policy-table th {
  background: #f5f5f5;
}
.edit-btn {
  color: #1976d2;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
}
.delete-btn {
  color: #d32f2f;
  background: none;
  border: none;
  cursor: pointer;
}
.edit-btn:hover {
  text-decoration: underline;
}
.delete-btn:hover {
  text-decoration: underline;
}
</style>