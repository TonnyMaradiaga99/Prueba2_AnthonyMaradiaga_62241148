<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Seguros</h1>
    <PolicyForm
      :policyData="selectedPolicy"
      :isEdit="isEdit"
      @policy-added="handlePolicyAdded"
      @cancel-edit="handleCancelEdit"
    />
    <PolicyList
      :policies="policies"
      @policy-updated="fetchPolicies"
      @edit-policy="handleEditPolicy"
    />
  </div>
</template>

<script>
import PolicyForm from '../components/PolicyForm.vue';
import PolicyList from '../components/PolicyList.vue';
import { ref, onMounted } from 'vue';
import { getPolicies } from '../api/policies.js';

export default {
  components: {
    PolicyForm,
    PolicyList
  },
  setup() {
    const policies = ref([]);
    const selectedPolicy = ref(null);
    const isEdit = ref(false);

    const fetchPolicies = async () => {
      policies.value = await getPolicies();
    };

    const handlePolicyAdded = () => {
      fetchPolicies();
      selectedPolicy.value = null;
      isEdit.value = false;
    };

    const handleEditPolicy = (policy) => {
      selectedPolicy.value = { ...policy };
      isEdit.value = true;
    };

    const handleCancelEdit = () => {
      selectedPolicy.value = null;
      isEdit.value = false;
    };

    onMounted(fetchPolicies);

    return {
      policies,
      fetchPolicies,
      selectedPolicy,
      isEdit,
      handlePolicyAdded,
      handleEditPolicy,
      handleCancelEdit
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>