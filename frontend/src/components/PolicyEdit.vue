<template>
  <div class="max-w-lg mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Editar Póliza</h2>
    <form @submit.prevent="updatePolicy">
      <div class="mb-4">
        <label for="numeroPoliza" class="block text-sm font-medium text-gray-700">Número de Póliza</label>
        <input type="text" v-model="policy.numeroPoliza" id="numeroPoliza" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
      </div>
      <div class="mb-4">
        <label for="tipoSeguro" class="block text-sm font-medium text-gray-700">Tipo de Seguro</label>
        <select v-model="policy.tipoSeguro" id="tipoSeguro" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required>
          <option value="Auto">Auto</option>
          <option value="Vida">Vida</option>
          <option value="Hogar">Hogar</option>
          <option value="Salud">Salud</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="titular" class="block text-sm font-medium text-gray-700">Titular</label>
        <input type="text" v-model="policy.titular" id="titular" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
      </div>
      <div class="mb-4">
        <label for="monto" class="block text-sm font-medium text-gray-700">Monto</label>
        <input type="number" v-model="policy.monto" id="monto" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Actualizar Póliza</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPolicy, updatePolicy } from '../api/policies';

export default {
  props: {
    policyId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const policy = ref({
      numeroPoliza: '',
      tipoSeguro: '',
      titular: '',
      monto: 0
    });

    onMounted(async () => {
      const data = await getPolicy(props.policyId);
      policy.value = data;
    });

    const updatePolicyHandler = async () => {
      await updatePolicy(props.policyId, policy.value);
      alert('Policy updated successfully!');
    };

    return {
      policy,
      updatePolicy: updatePolicyHandler
    };
  }
};
</script>

<style scoped>
</style>