<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">{{ isEdit ? 'Editar Póliza' : 'Nueva Póliza' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="numeroPoliza" class="block text-sm font-medium text-gray-700">Número de Póliza</label>
        <input type="text" id="numeroPoliza" v-model="policy.numeroPoliza" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
      </div>
      <div class="mb-4">
        <label for="tipoSeguro" class="block text-sm font-medium text-gray-700">Tipo de Seguro</label>
        <select id="tipoSeguro" v-model="policy.tipoSeguro" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50">
          <option value="" disabled>Selecciona tipo</option>
          <option v-for="tipo in tiposValidos" :key="tipo" :value="tipo">{{ tipo }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="titular" class="block text-sm font-medium text-gray-700">Titular</label>
        <input type="text" id="titular" v-model="policy.titular" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
      </div>
      <div class="mb-4">
        <label for="monto" class="block text-sm font-medium text-gray-700">Monto</label>
        <input type="number" id="monto" v-model="policy.monto" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">
        {{ isEdit ? 'Actualizar Póliza' : 'Crear Póliza' }}
      </button>
      <button
        v-if="isEdit"
        type="button"
        class="w-full bg-gray-400 text-white font-bold py-2 rounded hover:bg-gray-500 mt-2"
        @click="cancelar"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { createPolicy, updatePolicy } from '../api/policies';

export default {
  props: {
    policyData: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['policy-added', 'cancel-edit'],
  setup(props, { emit }) {
    const tiposValidos = ['Auto', 'Vida', 'Hogar', 'Salud'];
    const policy = ref({ ...props.policyData });

    watch(
      () => props.policyData,
      (newVal) => {
        policy.value = { ...newVal };
      },
      { deep: true, immediate: true }
    );

    const submitForm = async () => {
      try {
        if (props.isEdit) {
          await updatePolicy(policy.value._id, policy.value);
        } else {
          await createPolicy(policy.value);
        }
        emit('policy-added');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const cancelar = () => {
      emit('cancel-edit');
    };

    return { policy, tiposValidos, submitForm, cancelar };
  }
};
</script>

<style scoped>

</style>