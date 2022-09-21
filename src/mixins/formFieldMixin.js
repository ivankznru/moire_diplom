import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: {
    form: Object,
    value: {},
  },
  components: { BaseFormField },
  methods: {
    onInput(value) {
      this.$emit('input', value.target.value);
    },
  },
};
