// eslint-disable-next-line import/extensions
import BaseFormField from '@/components/BaseFormField';

export default {
  props: {
    title: {},
    error: {},
    value: {},
    placeholder: {},
    name: {},
  },
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
